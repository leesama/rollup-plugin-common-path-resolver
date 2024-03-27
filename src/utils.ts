import * as fs from 'fs-extra'
export function shouldSkipResolution(
  exclude: RegExp | undefined,
  importer: string | undefined
): boolean {
  return !!(exclude && importer && exclude.test(importer))
}

export function extractPathDirectory(
  importer: string,
  packagePathSegment: string,
  sourcePathSegment: string
): string | null {
  const regText = new RegExp(`(?<dirPath>.*${packagePathSegment}.*${sourcePathSegment}).*`)
  const pathDir = importer.match(regText)
  if (!pathDir || !pathDir.groups?.dirPath) {
    console.error(`Unable to find matching path segment in importer: ${importer}`)
    return null
  }
  return pathDir.groups.dirPath
}

export function replaceSourcePrefix(source: string, pathPrefix: string): string {
  const regex = new RegExp(`${pathPrefix}[\\\\/]`)
  return source.replace(regex, '')
}

export async function resolvePath(newPath: string): Promise<string | null> {
  if (await fs.pathExists(newPath)) {
    return newPath
  }
  return null
}

export function extractProjectName(
  importer: string,
  packagePathSegment: string,
  sourcePathSegment: string
): string | null {
  const match = new RegExp(
    `${packagePathSegment}[\\\\/](?<projectName>[^\\\\/]+)[\\\\/]${sourcePathSegment}`
  ).exec(importer)
  if (!match || !match.groups?.projectName) {
    console.error(`Unable to extract project name from importer: ${importer}`)
    return null
  }
  return match.groups.projectName
}

export function constructCommonRootPath(
  newPath: string,
  projectName: string,
  commonFolderName: string
): string {
  return newPath.replace(projectName, commonFolderName)
}
