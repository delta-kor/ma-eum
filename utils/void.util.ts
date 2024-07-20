import OpenAI from 'openai';
import 'server-only';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default class Void {
  public static async check(content: string): Promise<boolean | null> {
    if (process.env.ENABLE_VOID === '0') return null;

    try {
      const response = await openai.chat.completions.create({
        frequency_penalty: 0,
        max_tokens: 256,
        messages: [
          {
            content: process.env.OPENAI_SYSTEM_MESSAGE as string,
            role: 'system',
          },
          {
            content,
            role: 'user',
          },
        ],
        model: 'gpt-4o-mini',
        presence_penalty: 0,
        temperature: 0,
        top_p: 1,
      });

      const result = response.choices[0].message.content;
      if (result === '1') return true;
      else if (result === '0') return false;

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
