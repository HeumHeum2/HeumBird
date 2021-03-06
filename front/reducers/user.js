import produce from 'immer';

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isLoggingOut: false, // 로그아웃 시도중
  emailValidate: '', // 이메일 체크
  emailErrorReason: '', // 이메일 실패 사유
  nickValidate: '', // 닉네임 체크
  nickErrorReason: '', // 닉네임 실패 사유
  isSigningUp: false, // 회원가입 시도중
  isImageUploading: false, // 이미지 업로딩 중
  imageUploadingReason: '', // 이미지 업로딩 실패 사유
  me: null, // 내 정보
  userInfo: null, // 상대방 정보
  userSearching: false, // 유저 찾는 중
  userFinded: false, // 유저 발견
  userCommnetSearching: false, // 검색 폼 유저 찾는 중
  usersList: [], // 유저검색 리스트
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  hasMoreFollow: false, // 팔로우 더보기
  suggestedOtherList: [], //  팔로잉 목록의 팔로잉 추천 리스트
  hasMoreSuggestedOther: false, // 팔로잉 목록의 팔로잉 추천 더보기
  suggestedFollowList: [], // 팔로워에서의 추천 리스트
  hasMoreSuggestedFollow: false, // 팔로워에서의 추천 더보기
  isEditingInfo: false, // 정보 수정 중
  infoEdited: false, // 정보 수정 완료
  infoEditErrorReason: '', // 정보 수정 실패 사유
  isEditingPassword: false, // 비밀번호 수정 중,
  passwordEdited: false, // 비밀번호 수정 완료,
  passwordEditErrorReason: '', // 비밀번호 수정 실패 사유
};

// 액션의 이름
// 비동기 요청(리덕스 사가 필요함), 동기요청 (리덕스 사가 필요 없음)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_NULLURE = 'LOG_IN_NULLURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const EMAIL_INPUT_FAILURE = 'EMAIL_INPUT_FAILURE';
export const EMAIL_REGEX_FAILURE = 'EMAIL_REGEX_FAILURE';

export const NICKNAME_INPUT_FAILURE = 'NICKNAME_INPUT_FAILURE';
export const NICKNAME_REGEX_FAILURE = 'NICKNAME_REGEX_FAILURE';

export const DUPLICATE_USER_REQUEST = 'DUPLICATE_USER_REQUEST';
export const DUPLICATE_USER_SUCCESS = 'DUPLICATE_USER_SUCCESS';
export const DUPLICATE_USER_FAILURE = 'DUPLICATE_USER_FAILURE';

export const DUPLICATE_NICK_REQUEST = 'DUPLICATE_NICK_REQUEST';
export const DUPLICATE_NICK_SUCCESS = 'DUPLICATE_NICK_SUCCESS';
export const DUPLICATE_NICK_FAILURE = 'DUPLICATE_NICK_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_NULLURE = 'SIGN_UP_NULLURE';

export const USER_ACCESS_TARGET_REQUEST = 'USER_ACCESS_TARGET_REQUEST';
export const USER_ACCESS_TARGET_SUCCESS = 'USER_ACCESS_TARGET_SUCCESS';
export const USER_ACCESS_TARGET_FAILURE = 'USER_ACCESS_TARGET_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const LOAD_SUGGESTED_OTHER_REQUEST = 'LOAD_SUGGESTED_OTHER_REQUEST';
export const LOAD_SUGGESTED_OTHER_SUCCESS = 'LOAD_SUGGESTED_OTHER_SUCCESS';
export const LOAD_SUGGESTED_OTHER_FAILURE = 'LOAD_SUGGESTED_OTHER_FAILURE';

export const LOAD_SUGGESTED_FOLLOW_REQUEST = 'LOAD_SUGGESTED_FOLLOW_REQUEST';
export const LOAD_SUGGESTED_FOLLOW_SUCCESS = 'LOAD_SUGGESTED_FOLLOW_SUCCESS';
export const LOAD_SUGGESTED_FOLLOW_FAILURE = 'LOAD_SUGGESTED_FOLLOW_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const UPLOAD_USER_IMAGE_REQUEST = 'UPLOAD_USER_IMAGE_REQUEST';
export const UPLOAD_USER_IMAGE_SUCCESS = 'UPLOAD_USER_IMAGE_SUCCESS';
export const UPLOAD_USER_IMAGE_FAILURE = 'UPLOAD_USER_IMAGE_FAILURE';

export const REMOVE_USER_IMAGE_REQUEST = 'REMOVE_USER_IMAGE_REQUEST';
export const REMOVE_USER_IMAGE_SUCCESS = 'REMOVE_USER_IMAGE_SUCCESS';
export const REMOVE_USER_IMAGE_FAILURE = 'REMOVE_USER_IMAGE_FAILURE';

export const FIND_USER_REQUEST = 'FIND_USER_REQUEST';
export const FIND_USER_SUCCESS = 'FIND_USER_SUCCESS';
export const FIND_USER_FAILURE = 'FIND_USER_FAILURE';
export const FIND_USER_NULLURE = 'FIND_USER_NULLURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';
export const EDIT_USER_NULLURE = 'EDIT_USER_NULLURE';

export const EDIT_USER_PASSWORD_REQUEST = 'EDIT_USER_PASSWORD_REQUEST';
export const EDIT_USER_PASSWORD_SUCCESS = 'EDIT_USER_PASSWORD_SUCCESS';
export const EDIT_USER_PASSWORD_FAILURE = 'EDIT_USER_PASSWORD_FAILURE';
export const EDIT_USER_PASSWORD_NULLURE = 'EDIT_USER_PASSWORD_NULLURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.error;
        draft.me = null;
        break;
      }
      case LOG_IN_NULLURE: {
        draft.logInErrorReason = '';
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        break;
      }

      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data;
          break;
        }
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        break;
      }
      case EMAIL_INPUT_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = '이메일을 입력해주세요!';
        break;
      }
      case EMAIL_REGEX_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = '이메일 형식으로 입력해주세요!';
        break;
      }
      case DUPLICATE_USER_REQUEST: {
        draft.emailValidate = 'validating';
        draft.emailErrorReason = '';
        break;
      }
      case DUPLICATE_USER_SUCCESS: {
        draft.emailValidate = 'success';
        draft.emailErrorReason = '';
        break;
      }
      case DUPLICATE_USER_FAILURE: {
        draft.emailValidate = 'error';
        draft.emailErrorReason = action.error;
        break;
      }
      case NICKNAME_INPUT_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = '닉네임을 입력해주세요!';
        break;
      }
      case NICKNAME_REGEX_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = '2~20글자로 입력해주세요!';
        break;
      }
      case DUPLICATE_NICK_REQUEST: {
        draft.nickValidate = 'validating';
        draft.nickErrorReason = '';
        break;
      }
      case DUPLICATE_NICK_SUCCESS: {
        draft.nickValidate = 'success';
        draft.nickErrorReason = '';
        break;
      }
      case DUPLICATE_NICK_FAILURE: {
        draft.nickValidate = 'error';
        draft.nickErrorReason = action.error;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningUp = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        break;
      }
      case SIGN_UP_NULLURE: {
        draft.isSigningUp = false;
        draft.emailValidate = '';
        draft.emailErrorReason = '';
      }
      case USER_ACCESS_TARGET_REQUEST: {
        break;
      }
      case USER_ACCESS_TARGET_SUCCESS: {
        draft.me.publictarget = action.data;
        break;
      }
      case USER_ACCESS_TARGET_FAILURE: {
        break;
      }
      case LOAD_SUGGESTED_OTHER_REQUEST: {
        draft.suggestedOtherList = !action.offset
          ? []
          : draft.suggestedOtherList;
        draft.hasMoreSuggestedOther = action.offset
          ? draft.hasMoreSuggestedOther
          : true;
        break;
      }
      case LOAD_SUGGESTED_OTHER_SUCCESS: {
        action.data.forEach(d => {
          draft.suggestedOtherList.push(d);
        });
        draft.hasMoreSuggestedOther = action.data.length === 30;
        break;
      }
      case LOAD_SUGGESTED_OTHER_FAILURE: {
        break;
      }
      case LOAD_SUGGESTED_FOLLOW_REQUEST: {
        draft.suggestedFollowList = !action.offset
          ? []
          : draft.suggestedFollowList;
        draft.hasMoreSuggestedFollow = action.offset
          ? draft.hasMoreSuggestedFollow
          : true;
        break;
      }
      case LOAD_SUGGESTED_FOLLOW_SUCCESS: {
        action.data.forEach(d => {
          draft.suggestedFollowList.push(d);
        });
        draft.hasMoreSuggestedFollow = action.data.length === 30;
        break;
      }
      case LOAD_SUGGESTED_FOLLOW_FAILURE: {
        break;
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.followerList = !action.offset ? [] : draft.followerList;
        draft.hasMoreFollow = action.offset ? draft.hasMoreFollow : true;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.data.forEach(d => {
          draft.followerList.push(d);
        });
        draft.hasMoreFollow = action.data.length === 15;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break;
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.followingList = !action.offset ? [] : draft.followingList;
        draft.hasMoreFollow = action.offset ? draft.hasMoreFollow : true;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.data.forEach(d => {
          draft.followingList.push(d);
        });
        draft.hasMoreFollow = action.data.length === 15;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
      }
      case FOLLOW_USER_REQUEST: {
        break;
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.Followings.unshift(action.data);
        if (!!draft.userInfo && draft.userInfo.id === action.data.id) {
          draft.userInfo.Followers += 1;
          draft.followerList.push({
            id: draft.me.id,
            nickname: draft.me.nickname,
          });
        }
        if (!!draft.userInfo && draft.me.id === draft.userInfo.id) {
          draft.followingList.push(action.data);
        }
        break;
      }
      case FOLLOW_USER_FAILURE: {
        break;
      }
      case UNFOLLOW_USER_REQUEST: {
        break;
      }
      case UNFOLLOW_USER_SUCCESS: {
        const index = draft.me.Followings.findIndex(v => v.id === action.data);
        draft.me.Followings.splice(index, 1);
        if (!!draft.userInfo && draft.userInfo.id === action.data) {
          draft.userInfo.Followers -= 1;
          const listIndex = draft.followerList.findIndex(
            v => v.id === draft.me.id,
          );
          draft.followerList.splice(listIndex, 1);
        }
        if (!!draft.userInfo && draft.me.id === draft.userInfo.id) {
          const listIndex = draft.followingList.findIndex(
            v => v.id === action.data,
          );
          draft.followingList.splice(listIndex, 1);
        }
        break;
      }
      case UNFOLLOW_USER_FAILURE: {
        break;
      }
      case UPLOAD_USER_IMAGE_REQUEST: {
        draft.isImageUploading = true;
        break;
      }
      case UPLOAD_USER_IMAGE_SUCCESS: {
        draft.isImageUploading = false;
        draft.me.Image = action.data;
        if (draft.userInfo) {
          draft.userInfo.Image = action.data;
        }
        break;
      }
      case UPLOAD_USER_IMAGE_FAILURE: {
        draft.isImageUploading = false;
        draft.imageUploadingReason = action.error;
        break;
      }
      case REMOVE_USER_IMAGE_REQUEST: {
        draft.isImageUploading = true;
        break;
      }
      case REMOVE_USER_IMAGE_SUCCESS: {
        draft.isImageUploading = false;
        draft.me.Image = null;
        if (draft.userInfo) {
          draft.userInfo.Image = null;
        }
        break;
      }
      case REMOVE_USER_IMAGE_FAILURE: {
        draft.isImageUploading = false;
        draft.imageUploadingReason = action.error;
        break;
      }
      case FIND_USER_REQUEST: {
        if (!action.data || !action.search) {
          draft.userCommnetSearching = true;
        } else {
          draft.userSearching = true;
        }
        draft.usersList = [];
        draft.userFinded = false;
        break;
      }
      case FIND_USER_SUCCESS: {
        action.data.forEach(d => {
          draft.usersList.push(d);
        });
        if (!action.search) {
          draft.userCommnetSearching = false;
        } else {
          draft.userFinded = !action.data.length ? false : true;
          draft.userSearching = false;
        }
        break;
      }
      case FIND_USER_FAILURE: {
        draft.userSearching = false;
        draft.userCommnetSearching = false;
        break;
      }
      case FIND_USER_NULLURE: {
        draft.userSearching = false;
        draft.usersList = [];
        draft.userFinded = false;
        draft.userCommnetSearching = false;
        break;
      }
      case EDIT_USER_REQUEST: {
        draft.isEditingInfo = true;
        draft.infoEdited = false;
        draft.infoEditErrorReason = '';
        break;
      }
      case EDIT_USER_SUCCESS: {
        draft.isEditingInfo = false;
        draft.infoEdited = true;
        draft.me = action.data;
        break;
      }
      case EDIT_USER_FAILURE: {
        draft.isEditingInfo = false;
        draft.infoEditErrorReason = action.error;
        break;
      }
      case EDIT_USER_NULLURE: {
        draft.isEditingInfo = false;
        draft.infoEdited = false;
        draft.infoEditErrorReason = '';
        break;
      }
      case EDIT_USER_PASSWORD_REQUEST: {
        draft.isEditingPassword = true;
        draft.passwordEdited = false;
        draft.passwordEditErrorReason = '';
        break;
      }
      case EDIT_USER_PASSWORD_SUCCESS: {
        draft.isEditingPassword = false;
        draft.passwordEdited = true;
        break;
      }
      case EDIT_USER_PASSWORD_FAILURE: {
        draft.isEditingPassword = false;
        draft.passwordEditErrorReason = action.error;
        break;
      }
      case EDIT_USER_PASSWORD_NULLURE: {
        draft.passwordEdited = false;
        draft.passwordEditErrorReason = '';
        draft.isEditingPassword = false;
        break;
      }
      default: {
        break;
      }
    }
  });
};
