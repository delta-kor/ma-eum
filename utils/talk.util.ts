import { ModalContext, ModalResult } from '@/providers/ModalProvider';

interface ValidateNicknameResult {
  error: boolean;
  message?: string;
  nickname?: string;
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
