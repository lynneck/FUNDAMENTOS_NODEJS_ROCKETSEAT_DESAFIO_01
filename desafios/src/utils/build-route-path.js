


export function buildRoutePath (path) {
  
    const routeParametersRegex = /:([a-zA-z]+)/g

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex

    //console.log(pathRegex);
    
}