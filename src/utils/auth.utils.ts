export const refreshToHome = () => {
  window.location.assign("/");
};

export const refreshToLogin = (search = "") => {
  window.location.assign(`/login${search}`);
};
