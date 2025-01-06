export function getDeviceTypeFromUserAgent() {
  const userAgent = navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android(?!.*Mobile)/i;

  if (tabletRegex.test(userAgent)) {
    return "tablet";
  } else if (mobileRegex.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
}
