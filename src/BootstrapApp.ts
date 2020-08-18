import canvas from './App'

export default function bootstrapApplication(tagId: string) {
  const element = document.getElementById(tagId)

  if (element == null) {
    throw new Error('Could not find element with specified id')
  }

  element.innerHTML = ''
  element.appendChild(canvas)
}
