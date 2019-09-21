export default function(data) {
  const isWww = data.req && ~data.req.headers.host.indexOf('www')
  if (isWww) {
    data.redirect('301', `${process.env.HOST}${data.route.fullPath}`)
  }
}
