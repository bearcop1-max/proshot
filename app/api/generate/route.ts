import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export const runtime = "nodejs";
export const maxDuration = 60;

// fal-ai 클라이언트 설정 (서버 사이드에서만 실행됨)
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: Request) {
  try {
    const { imageBase64, style } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "셀카 이미지가 업로드되지 않았습니다." },
        { status: 400 }
      );
    }

    // 1. Base64 데이터 URL 프리픽스 제거 및 Buffer 변환
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // 2. Blob으로 래핑
    const blob = new Blob([buffer], { type: "image/jpeg" });

    // 3. fal.storage.upload()를 사용해 업로드하여 reference URL 획득
    let reference_image_url: string;
    try {
      reference_image_url = await fal.storage.upload(blob);
    } catch (uploadErr) {
      console.error("Storage upload error:", uploadErr);
      return NextResponse.json(
        { error: "이미지 서버 업로드에 실패했습니다. 사진 파일 형식을 확인해주세요." },
        { status: 500 }
      );
    }

    // 4. 스타일별 프롬프트 매핑
    let prompt = "";
    switch (style) {
      case "studio":
        prompt = "A high-quality professional studio headshot of a person, clean solid studio background, elegant and soft studio lighting, professional portrait, 8k, photorealistic";
        break;
      case "outdoor":
        prompt = "A high-quality professional outdoor headshot of a person, natural daylight, soft bokeh background, park or modern city street, warm lighting, professional portrait, 8k, photorealistic";
        break;
      case "corporate":
      default:
        prompt = "A high-quality professional corporate headshot of a person, neat business attire, clean blurred background, executive profile portrait, professional lighting, 8k, photorealistic";
        break;
    }

    // 5. fal.subscribe("fal-ai/flux-pulid") 호출
    const result: any = await fal.subscribe("fal-ai/flux-pulid", {
      input: {
        prompt,
        reference_image_url,
        image_size: "portrait_4_3",
        num_inference_steps: 20,
        guidance_scale: 4,
        id_weight: 1,
        negative_prompt: "blurry, low quality, distorted face, watermark, text, signature, drawing, illustration"
      }
    });

    if (result && result.data && result.data.images && result.data.images[0]) {
      return NextResponse.json({ imageUrl: result.data.images[0].url });
    } else {
      return NextResponse.json(
        { error: "AI 이미지 생성 결과를 받아오지 못했습니다. 다시 시도해 주세요." },
        { status: 500 }
      );
    }

  } catch (err) {
    console.error("API error during generation:", err);
    return NextResponse.json(
      { error: "헤드샷 생성 중 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
