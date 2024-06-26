interface ValidateNicknameResult {
  error: boolean;
  message?: string;
  nickname?: string;
}

export default class TalkUtil {
  public static validateNickname(nickname: any): ValidateNicknameResult {
    if (!nickname || typeof nickname !== 'string') {
      return { error: true, message: '닉네임을 입력해주세요.' };
    }

    const allowedNickname = /^[a-zA-Z0-9ㄱ-ㅎ가-힣+\-._=\s]+$/;
    if (!allowedNickname.test(nickname)) {
      return { error: true, message: '닉네임은 한글, 영어, 숫자만 사용 가능해요.' };
    }

    const sanitizedNickname = nickname.trim().replace(/\s+/g, ' ');
    if (sanitizedNickname.length < 2 || sanitizedNickname.length > 15) {
      return { error: true, message: '닉네임은 2자 이상 15자 이하로 입력해주세요.' };
    }

    return { error: false, nickname: sanitizedNickname };
  }
}
