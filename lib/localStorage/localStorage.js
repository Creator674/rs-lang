const LOCAL_STORAGE_NAME = 'rs-lang'

function pushLocalStorage(storage) {
  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(storage))
}

function findPathInObjectProps(obj, prop) {
  let path = prop.split('.').map((str) => str.trim())
  let value
  for (let i = 0; i < path.length; i += 1) {
    value = value ? value[path[i]] : obj[path[i]]
  }

  return value
}

function findInObject(obj, prop) {
  const res = findPathInObjectProps(obj, prop)
  return res
}

export function getLocalStorageProp(prop) {
  const ls = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME)) || {}
  if (!prop) return ls
  return findInObject(ls, prop)
}

export function setLocalStorageProp(path, data) {
  const ls = getLocalStorageProp()
  const parsedPath = path.split('.').map((str) => str.trim())
  const prop = parsedPath.pop() || path
  let destination = null
  parsedPath.forEach((key) => {
    if (ls[key]) {
      destination = ls[key]
    } else {
      ls[key] = {}
      destination = ls[key]
    }
  })
  if (destination) {
    destination[prop] = data
  } else {
    ls[prop] = data
  }
  pushLocalStorage(ls)
}
