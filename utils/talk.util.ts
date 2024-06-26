import { ModalContext, ModalResult } from '@/providers/ModalProvider';

interface ValidateNicknameResult {
  error: boolean;
  message?: string;
  nickname?: string;
}

interface ValidateArticleResult {
  content?: string;
  error: boolean;
  message?: string;
  title?: string;
}

interface ValidateCommentResult {
  content?: string;
  error: boolean;
  message?: string;
}

interface CheckLoginConfig {
  action: () => void;
  login: boolean;
  modal: ModalContext;
}

export default class TalkUtil {
  public static checkLogin(config: CheckLoginConfig) {
    const login = config.login;
    if (login) {
      config.action();
      return;
    }

    config.modal.login((result: ModalResult) => {
      if (result.type === 'confirm') {
        config.action();
      }
    });
  }

  public static validateArticle(title: any, content: any): ValidateArticleResult {
    if (!title || typeof title !== 'string') {
      return { error: true, message: '$error_enter_title' };
    }

    if (!content || typeof content !== 'string') {
      return { error: true, message: '$error_enter_content' };
    }

    const sanitizedTitle = title.trim().replace(/\n/g, '');
    if (!sanitizedTitle || sanitizedTitle.length > 50) {
      return { error: true, message: '$error_invalid_length_title' };
    }

    const sanitizedContent = content.trim().replace(/\n\s*\n\s*\n/g, '\n\n');
    if (!sanitizedContent || sanitizedContent.length > 1000) {
      return { error: true, message: '$error_invalid_length_content' };
    }

    return { content: sanitizedContent, error: false, title: sanitizedTitle };
  }

  public static validateComment(content: any): ValidateCommentResult {
    if (!content || typeof content !== 'string') {
      return { error: true, message: '$error_enter_comment' };
    }

    const sanitizedContent = content.trim().replace(/\n\s*\n\s*\n/g, '\n\n');
    if (!sanitizedContent || sanitizedContent.length > 300) {
      return { error: true, message: '$error_invalid_length_comment' };
    }

    return { content: sanitizedContent, error: false };
  }

  public static validateNickname(nickname: any): ValidateNicknameResult {
    if (!nickname || typeof nickname !== 'string') {
      return { error: true, message: '$error_enter_nickname' };
    }

    const allowedNickname = /^[a-zA-Z0-9ㄱ-ㅎ가-힣+\-._=\s]+$/;
    if (!allowedNickname.test(nickname)) {
      return { error: true, message: '$error_invalid_character_nickname' };
    }

    const sanitizedNickname = nickname.trim().replace(/\s+/g, ' ');
    if (sanitizedNickname.length < 2 || sanitizedNickname.length > 15) {
      return { error: true, message: '$error_invalid_length_nickname' };
    }

    return { error: false, nickname: sanitizedNickname };
  }
}
