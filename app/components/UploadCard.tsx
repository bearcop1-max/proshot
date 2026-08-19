"use client";

import React, { useState, useRef, useEffect } from "react";

type ProfileStyle = "corporate" | "studio" | "outdoor";

interface StyleOption {
  value: ProfileStyle;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export default function UploadCard() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ProfileStyle>("corporate");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 에러 메시지 자동 삭제 효과 (토스트 형태)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const styleOptions: StyleOption[] = [
    {
      value: "corporate",
      label: "비즈니스 정장",
      desc: "신뢰감을 주는 포멀 아웃핏",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      value: "studio",
      label: "스튜디오",
      desc: "우아하고 깨끗한 조명 톤",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      value: "outdoor",
      label: "야외 자연광",
      desc: "트렌디한 자연 조명 무드",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      )
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setGeneratedUrl(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 1. 이미지 타입 유효성 검사
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있습니다.");
      setPreviewUrl(null);
      return;
    }

    // 2. 8MB 크기 제한 유효성 검사
    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("8MB 이하의 이미지만 업로드할 수 있습니다.");
      setPreviewUrl(null);
      return;
    }

    // 3. Base64 변환 및 프리뷰 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (isLoading) return;
    fileInputRef.current?.click();
  };

  const removeSelectedFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    setPreviewUrl(null);
    setGeneratedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerate = async () => {
    if (!previewUrl || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: previewUrl,
          style: selectedStyle,
        }),
      });

      const data = (await response.json()) as { imageUrl?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "헤드샷 생성에 실패했습니다.");
      }

      if (data.imageUrl) {
        setGeneratedUrl(data.imageUrl);
      } else {
        throw new Error("생성된 이미지 주소가 존재하지 않습니다.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "서버 통신 중 에러가 발생했습니다. 다시 시도해 주세요.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!generatedUrl) return;
    try {
      const response = await fetch(generatedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "proshot-headshot.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      setError("PNG 다운로드에 실패했습니다. 마우스 우클릭 후 다른 이름으로 저장을 이용해주세요.");
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setGeneratedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStyleChangeOnly = () => {
    setGeneratedUrl(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/40 relative">
      
      {/* 한국어 에러 토스트 알림창 */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-rose-50 border border-rose-100 text-rose-700 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 text-sm font-semibold animate-bounce">
          <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      {/* 로딩 스켈레톤 (이미지 생성 진행 중일 때 노출) */}
      {isLoading && (
        <div className="py-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 text-xs font-bold text-blue-700 mb-3 animate-pulse">
              <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI가 프로필 사진을 그리는 중...
            </div>
            <p className="text-sm text-slate-500">평균 15~20초 소요됩니다. 잠시만 기다려 주세요!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* 원본 사진 스켈레톤 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 aspect-[4/3] opacity-60">
              {previewUrl && <img src={previewUrl} alt="Original" className="w-full h-full object-cover" />}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 text-white text-xs font-bold uppercase tracking-wider">
                원본
              </div>
            </div>

            {/* AI 결과물 스켈레톤 */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-100 bg-slate-100/50 aspect-[4/3] flex flex-col items-center justify-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-slate-200 mb-3" />
              <div className="h-3 w-36 bg-slate-200 rounded mb-1.5" />
              <div className="h-2.5 w-20 bg-slate-200 rounded" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                AI 헤드샷
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 결과 생성 성공 뷰 (Before / After 뷰) */}
      {!isLoading && generatedUrl && (
        <div className="py-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-bold text-emerald-700 border border-emerald-100 mb-3">
              ✨ 성공적으로 복원되었습니다!
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">비포 & 애프터 비교</h3>
          </div>

          {/* Before & After 2열 카드 배치 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mb-10">
            
            {/* 원본 카드 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[4/3] shadow-sm hover:shadow transition-shadow">
              {previewUrl && (
                <img src={previewUrl} alt="Original selfie" className="w-full h-full object-cover" />
              )}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-sm text-white text-xs font-bold tracking-wider">
                원본
              </div>
            </div>

            {/* AI 헤드샷 카드 */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/80 bg-white aspect-[4/3] shadow-md hover:shadow-lg transition-shadow">
              <img src={generatedUrl} alt="AI generated headshot" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold tracking-wider shadow-sm">
                AI 헤드샷
              </div>
            </div>

          </div>

          {/* 다기능 액션 버튼 그리드 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center max-w-xl mx-auto">
            <button
              onClick={handleDownloadPng}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-indigo-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PNG 다운로드
            </button>
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-base rounded-2xl shadow-sm hover:shadow transition-all"
            >
              다시 생성
            </button>
            <button
              onClick={handleStyleChangeOnly}
              className="w-full sm:w-auto px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-base rounded-2xl transition-all"
            >
              스타일 바꾸기
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-4 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors"
            >
              전체 초기화
            </button>
          </div>
        </div>
      )}

      {/* 업로드 대기 / 스타일 선택 기본 뷰 */}
      {!isLoading && !generatedUrl && (
        <div className="max-w-xl mx-auto">
          
          {/* 이미지 업로드 영역 */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-800 mb-2">셀카 사진 업로드</label>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {!previewUrl ? (
              <div 
                onClick={triggerFileInput}
                className="border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/10 cursor-pointer rounded-2xl p-8 transition-all flex flex-col items-center justify-center group bg-slate-50/50"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-slate-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300 shadow-sm border border-slate-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-slate-700 mb-1">여기를 눌러 사진 선택</p>
                <p className="text-xs text-slate-400">지원 형식: JPG, PNG, WEBP (최대 8MB)</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video w-full bg-slate-50 flex items-center justify-center shadow-sm">
                <img 
                  src={previewUrl} 
                  alt="Selfie preview" 
                  className="max-h-full max-w-full object-contain"
                />
                <button 
                  onClick={removeSelectedFile}
                  className="absolute top-3 right-3 p-2 bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-sm text-white rounded-full transition-colors"
                  title="사진 지우기"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* 스타일 피커 */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-800 mb-3">헤드샷 스타일 선택</label>
            <div className="grid grid-cols-3 gap-3">
              {styleOptions.map((opt) => {
                const isSelected = selectedStyle === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setSelectedStyle(opt.value)}
                    className={`cursor-pointer border rounded-2xl p-4 text-center flex flex-col items-center justify-center transition-all ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50/20 text-blue-600 shadow-sm font-semibold" 
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                      isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-50 text-slate-500"
                    }`}>
                      {opt.icon}
                    </div>
                    <div className="text-xs font-bold mb-0.5">{opt.label}</div>
                    <div className="text-[9px] text-slate-400 leading-tight hidden sm:block">{opt.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={!previewUrl}
            className={`w-full py-4 text-center font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
              previewUrl
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed opacity-60"
            }`}
          >
            헤드샷 생성
          </button>

        </div>
      )}

    </div>
  );
}


