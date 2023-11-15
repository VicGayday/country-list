function pagination(page, pages) {
  const DOTS = "..."
  let sibling = 1
  const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }
  const totalPageNumber = sibling + 5
  if (totalPageNumber >= pages) {
    return range(1, pages)
  }
  const leftSiblingIndex = Math.max(page - sibling, 1)
  const rightSiblingIndex = Math.min(page + sibling, pages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < pages - 2

  const firstPageIndex = 1
  const lastPageIndex = pages

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * sibling
    let leftRange = range(1, leftItemCount)
    return [...leftRange, DOTS, pages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * sibling
    let rightRange = range(pages - rightItemCount + 1, pages)
    return [firstPageIndex, DOTS, ...rightRange]
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }
}
