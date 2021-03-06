export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时')
  }else if (between < (86400*30)) {
     return pluralize(~~(between / (86400)), '天')
  }else if (between < (86400*30*365)){
    return pluralize(~~(between / (86400*30)), '月')
  }else {
    return pluralize(~~(between / (86400*30*365)), '年')
  }
}

function pluralize (time, label) {
 // if (time === 1) {
    return time + label
 // }
 // return time + label + 's'
}
