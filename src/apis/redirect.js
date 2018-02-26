// 注意测试环境与生产环境的appid
// 测试环境app授权链接： https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906825051&redirect_uri=https://cardtest.ipay.so/alipay/auth?req_from=voucher-mb
// 测试环境用户授权链接： https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017041906825051&auth_skip=false&scope=auth_base&redirect_uri=https://cardtest.ipay.so/koubei/activitymb/create
// 生产环境用户授权链接： https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906824519&redirect_uri=https://card.ipay.so/alipay/auth?req_from=voucher-mb
// 生产环境用户授权链接： https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017041906824519&auth_skip=false&scope=auth_base&redirect_uri=https://card.ipay.so/lingxi/koubei/activitymb/create

let redirectToAppAuth
let redirectToPublicAppAuth
if (process.env.NODE_ENV === 'production') {
  redirectToAppAuth = 'https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906824519&redirect_uri=https://card.ipay.so/alipay/auth?req_from=voucher-mb'
  redirectToPublicAppAuth = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017041906824519&auth_skip=false&scope=auth_base&redirect_uri=https://card.ipay.so/lingxi/koubei/activitymb/create'
} else {
  redirectToAppAuth = 'https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906825051&redirect_uri=https://cardtest.ipay.so/alipay/auth?req_from=voucher-mb'
  redirectToPublicAppAuth = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017041906825051&auth_skip=false&scope=auth_base&redirect_uri=https://cardtest.ipay.so/koubei/activitymb/create&vconsole=hide'
}
export { redirectToAppAuth, redirectToPublicAppAuth }
