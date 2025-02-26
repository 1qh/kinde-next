import { codeToHtml } from 'shiki'

const info = async (obj: object | null) => (
  <div
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: await codeToHtml(JSON.stringify(obj, null, 2), {
        lang: 'json',
        theme: 'monokai'
      })
    }}
  />
)

export default info
