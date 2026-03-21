import { GoogleGenAI, Modality, Type, VideoGenerationReferenceType } from "@google/genai";

// Extend Window interface for AI Studio API key selection
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const AI_MODELS = {
  FLASH_IMAGE: "gemini-3.1-flash-image-preview",
  PRO_IMAGE: "gemini-3-pro-image-preview",
  VEO: "veo-3.1-fast-generate-preview",
  PRO: "gemini-3.1-pro-preview",
  FLASH_LITE: "gemini-3.1-flash-lite-preview",
  FLASH_GROUNDING: "gemini-2.5-flash",
};

export class AIService {
  private static getAI() {
    // Always create a new instance to ensure the latest API key is used
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  static async checkAndOpenKeySelector() {
    if (typeof window.aistudio !== 'undefined') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  }

  // 1. Image Generation (Flash Image)
  static async generateImageFlash(
    prompt: string, 
    imageBase64?: string,
    size: "1K" | "2K" | "4K" = "1K", 
    aspectRatio: string = "1:1"
  ) {
    const ai = this.getAI();
    const parts: any[] = [{ text: prompt }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: "image/png"
        }
      });
    }

    const response = await ai.models.generateContent({
      model: AI_MODELS.FLASH_IMAGE,
      contents: { parts },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: aspectRatio as any
        } as any
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  // 2. Image Generation (Pro Image) with Size & Aspect Ratio
  static async generateImagePro(
    prompt: string, 
    size: "1K" | "2K" | "4K" = "1K", 
    aspectRatio: string = "1:1",
    quality: "standard" | "high" = "standard",
    negativePrompt?: string
  ) {
    await this.checkAndOpenKeySelector();
    const ai = this.getAI();
    
    const response = await ai.models.generateContent({
      model: AI_MODELS.PRO_IMAGE,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: aspectRatio as any,
          quality: quality as any,
          negativePrompt: negativePrompt
        } as any
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  // 3. Video Generation (Veo)
  static async generateVideo(prompt: string, imageBase64?: string, aspectRatio: "16:9" | "9:16" = "16:9") {
    await this.checkAndOpenKeySelector();
    const ai = this.getAI();
    
    const config: any = {
      model: AI_MODELS.VEO,
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio
      }
    };

    if (imageBase64) {
      config.image = {
        imageBytes: imageBase64.split(',')[1],
        mimeType: 'image/png'
      };
    }

    let operation = await ai.models.generateVideos(config);

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY || '',
        },
      });
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return null;
  }

  // 4. Chatbot (Pro)
  static async chat(message: string, history: any[] = []) {
    const ai = this.getAI();
    const chat = ai.chats.create({
      model: AI_MODELS.PRO,
      config: {
        systemInstruction: "You are a helpful AI assistant integrated into Merikeb Gashu's portfolio. You help users understand his skills, projects, and the AI features he has built."
      }
    });
    
    // Note: sendMessage doesn't support history directly in this SDK version easily, 
    // but we can pass it if we manage the chat object. For simplicity, we'll use generateContent for now if history is needed, 
    // or just keep the chat instance in the component.
    const response = await chat.sendMessage({ message });
    return response.text;
  }

  // 5. Fast Responses (Flash Lite)
  static async fastResponse(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: AI_MODELS.FLASH_LITE,
      contents: prompt,
    });
    return response.text;
  }

  // 6. Multimodal Analysis (Image/Video)
  static async analyzeMultimodal(prompt: string, fileBase64: string, mimeType: string) {
    const ai = this.getAI();
    const parts: any[] = [
      { text: prompt },
      {
        inlineData: {
          data: fileBase64.split(',')[1],
          mimeType
        }
      }
    ];

    const response = await ai.models.generateContent({
      model: AI_MODELS.PRO,
      contents: { parts },
    });
    return response.text;
  }

  // 7. Maps Grounding
  static async searchWithMaps(query: string, lat?: number, lng?: number) {
    const ai = this.getAI();
    const config: any = {
      tools: [{ googleMaps: {} }]
    };

    if (lat !== undefined && lng !== undefined) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: AI_MODELS.FLASH_GROUNDING,
      contents: query,
      config
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  }
}
