import Image from "next/image";
import UploadCard from "./components/UploadCard";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-white overflow-hidden selection:bg-blue-100 selection:text-blue-800">
      
      {/* 장식용 배경 요소들 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 opacity-70">
        <div className="absolute top-[-10%] left-[5%] w-[350px] h-[350px] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {/* 헤더/네비게이션 */}
      <header className="mx-auto max-w-7xl px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
            P
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">ProShot</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden sm:inline-block">AI 프로필의 새로운 기준</span>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            이용방법
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        
        {/* 1. HERO SECTION */}
        <section className="py-20 md:py-28 text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 border border-blue-100 mb-6 animate-fade-in-down">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            단 10초 만에 완성하는 비즈니스 헤드샷
          </div>

          {/* 한국어 헤드라인 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.15] mb-6">
            셀카 한 장으로 만드는<br className="sm:hidden" />{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500">
              AI 프로필 사진
            </span>
          </h1>

          {/* 한 줄 서브헤드라인 */}
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-xl leading-relaxed">
            스튜디오 촬영 없이, 스마트폰 속 셀카 한 장으로 완벽한 비즈니스 프로필과 헤드샷을 완성하세요.
          </p>

          {/* 주 CTA 버튼 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 duration-300">
              내 헤드샷 만들기
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-semibold text-lg rounded-2xl transition-all shadow-sm hover:shadow">
              샘플 사진 구경하기
            </button>
          </div>

          {/* 실시간 사진 업로드 클라이언트 컴포넌트 */}
          <div className="w-full">
            <UploadCard />
          </div>
        </section>


        {/* 2. GALLERY / PREVIEW SECTION (Before & After 비주얼) */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-slate-100/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <div className="md:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  Before & After
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  빛과 구도까지 완벽하게 재구성하는 프리미엄 AI
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  정돈되지 않은 일상 속 스냅샷도 AI가 정밀하게 인식하여, 스튜디오 조명과 메이크업, 깔끔한 정장 스타일이 적용된 고품격 비즈니스 헤드샷으로 탈바꿈시킵니다.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">99.8%</div>
                    <div className="text-xs text-slate-500 font-medium">고객 만족도</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">10초</div>
                    <div className="text-xs text-slate-500 font-medium">평균 생성 속도</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 gap-4">
                {/* Before 카드 */}
                <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all">
                  <div className="aspect-square relative w-full bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=450&h=450&fit=crop"
                      alt="Before snap shot"
                      className="object-cover w-full h-full grayscale-[20%]"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                      Before (스냅 사진)
                    </div>
                  </div>
                </div>

                {/* After 카드 */}
                <div className="relative group rounded-2xl overflow-hidden border border-blue-200 bg-white shadow-md transition-all hover:border-blue-300">
                  <div className="aspect-square relative w-full bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=450&fit=crop"
                      alt="After AI Professional Shot"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-blue-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                      After (AI 프로필)
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION (rounded-2xl 카드 기반) */}
        <section className="py-16 md:py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              왜 ProShot일까요?
            </h2>
            <p className="text-slate-600 font-medium">
              최첨단 생성형 AI 모델이 당신만의 자연스러운 매력을 디테일하게 찾아냅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 카드 1 */}
            <div className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">셀카 딱 한 장이면 충분</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                수십 장의 학습 사진을 요구하는 타 서비스와 달리, 잘 나온 일상 속 단 한 장의 사진만으로 최고 퀄리티의 헤드샷을 보정·합성해 냅니다.
              </p>
            </div>

            {/* 카드 2 */}
            <div className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">10초 완성 초고속 렌더링</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                클라우드 AI 가속 인프라를 바탕으로, 수 시간 걸리던 합성 처리를 단 10초 만에 완수합니다. 제작 즉시 고화질 다운로드가 가능합니다.
              </p>
            </div>

            {/* 카드 3 */}
            <div className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">다양한 스타일 테마 제공</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                신뢰감을 주는 비즈니스 정장 스타일부터 친근한 캐주얼, 예술가 풍의 프로필까지 원하는 TPO에 맞는 배경과 아웃핏을 폭넓게 고를 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 4. PRESETS GALLERY (아름다운 카드들) */}
        <section className="py-16 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent rounded-[3rem]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              다양한 스타일의 프로필 샘플
            </h2>
            <p className="text-slate-600 font-medium">
              당신의 신뢰도와 개성을 빛나게 해 줄 다채로운 무드를 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* 샘플 1 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                  alt="Business Premium Blue Male"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-sm">비즈니스 블루 (남성)</p>
                <p className="text-slate-500 text-xs mt-0.5">신뢰감을 주는 포멀 아웃핏</p>
              </div>
            </div>

            {/* 샘플 2 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                  alt="Executive Warm Gray Female"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-sm">이그제큐티브 웜그레이</p>
                <p className="text-slate-500 text-xs mt-0.5">우아하고 프로페셔널한 연출</p>
              </div>
            </div>

            {/* 샘플 3 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop"
                  alt="Casual Beige Male"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-sm">내추럴 웜베이지 (남성)</p>
                <p className="text-slate-500 text-xs mt-0.5">자연스럽고 편안한 인상</p>
              </div>
            </div>

            {/* 샘플 4 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="aspect-[4/5] relative w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop"
                  alt="Creative Ivory Female"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-sm">크리에이티브 아이보리</p>
                <p className="text-slate-500 text-xs mt-0.5">자유롭고 트렌디한 스타트업 무드</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA SECTION */}
        <section className="py-20 md:py-24 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {/* 장식용 빛 */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                지금 셀카 한 장으로<br className="sm:hidden" /> 최고급 프로필 사진을 받아보세요
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
                첫 인상을 완벽하게 만드는 가장 혁신적인 인공지능 프로필 메이커 ProShot. 첫 생성 시 50% 특별 혜택을 드립니다.
              </p>
              <div className="pt-4">
                <button className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold text-lg rounded-2xl shadow-lg transition-all hover:scale-105 duration-300">
                  내 헤드샷 만들기
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white py-12 text-slate-500 text-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ProShot</span>
            <span className="text-slate-300">|</span>
            <span>AI CITY BUILDERS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-700 transition-colors">이용약관</a>
            <a href="#" className="hover:text-slate-700 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-slate-700 transition-colors">고객지원</a>
          </div>
          <p className="text-xs text-slate-400 md:order-first">
            &copy; 2026 ProShot — AI CITY BUILDERS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

