import { PluginOption } from 'vite'

import {
  shouldSkipResolution,
  constructCommonRootPath,
  extractPathDirectory,
  extractProjectName,
  replaceSourcePrefix,
  resolvePath
} from './utils'
import path from 'node:path'

export type CommonPathResolverOptions = {
  packagePathSegment?: string
  sourcePathSegment?: string
  commonFolderName?: string
  pathPrefix?: string
  exclude?: RegExp
}

export default function rollupPluginCommonPathResolver(
  options: CommonPathResolverOptions = {}
): PluginOption {
  const {
    packagePathSegment = 'packages',
    sourcePathSegment = 'src',
    commonFolderName = 'common',
    pathPrefix = '@',
    exclude
  } = options

  return {
    name: 'rollup-plugin-common-path-resolver',
    async resolveId(source, importer) {
      if (!importer || shouldSkipResolution(exclude, importer)) {
        return null
      }

      try {
        const dirPath = extractPathDirectory(importer, packagePathSegment, sourcePathSegment)
        if (!dirPath) throw new Error('Directory path extraction failed.')

        const newPath = path.join(dirPath, replaceSourcePrefix(source, pathPrefix))

        let resolvedPath = await resolvePath(newPath)
        if (resolvedPath) {
          return this.resolve(resolvedPath, importer)
        }

        const projectName = extractProjectName(importer, packagePathSegment, sourcePathSegment)
        if (!projectName) throw new Error('Project name extraction failed.')

        const commonRootPath = constructCommonRootPath(newPath, projectName, commonFolderName)
        resolvedPath = await resolvePath(commonRootPath)
        if (resolvedPath) {
          return this.resolve(resolvedPath, importer)
        }

        throw new Error('Path resolution ultimately failed.')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred'
        console.error(`[rollup-plugin-common-path-resolver] Error: ${message}`)
        return null
      }
    }
  }
}
