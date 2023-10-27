#!/usr/bin/env node

/* eslint-disable id-length, no-console, no-process-env, no-sync, no-process-exit */
const fs = require('fs')
const {log} = console
const XmlStream = require('xml-stream')
const parseDate = require('./lib/parseDate')
const parseBody = require('./lib/parseBody')
const slugify = require('slugify')
function generateAuthorId(id) {
  return `author-${id}`
}

function generateCategoryId(id) {
  return `category-${id}`
}

function readFile(path = '') {
  if (!path) {
    return console.error('You need to set path')
  }
  return fs.createReadStream(path)
}

const categorias = [
  {
    title: 'https://clinicalhr.pt/existem-outros-tratamentos-para-a-calvicie/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title:
      'https://clinicalhr.pt/descubra-como-combater-a-calvicie-com-tratamento-capilar-ou-transplante/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title:
      'https://clinicalhr.pt/queda-de-cabelo-e-calvicie-conheca-os-tratamentos-mais-eficazes-para-resolver-o-problema/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title: 'https://clinicalhr.pt/graus-de-calvicie-descubra-qual-e-o-seu-e-como-pode-tratar/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title:
      'https://clinicalhr.pt/ter-entradas-no-cabelo-e-normal-ou-sinal-de-calvicie-descubra-a-resposta-dos-nossos-especialistas/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title:
      'https://clinicalhr.pt/saiba-como-encontrar-a-melhor-solucao-para-a-calvicie-masculina-conheca-as-opcoes-cirurgicas-e-nao-cirurgicas/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title:
      'https://clinicalhr.pt/como-fazer-crescer-cabelo-nas-entradas-trave-a-calvicie-masculina-a-tempo/',
    ref: 'baca4620-ef42-4c54-8afc-3341247dbfc3',
  },
  {
    title: 'https://clinicalhr.pt/transplante-capilar-alguns-esclarecimentos/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/vale-a-pena-realizar-um-transplante-capilar-na-turquia/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/saiba-como-se-calcula-o-preco-real-de-um-transplante-capilar/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/5-questoes-sobre-um-bom-candidato-a-transplante-capilar-que-precisa-saber/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/qual-e-a-diferenca-entre-implante-capilar-e-transplante-capilar-saiba-a-resposta-dos-nossos-especialistas/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/confira-os-tipos-de-transplante-capilar-e-saiba-qual-e-o-melhor/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/transplante-capilar-descubra-os-7-passos-deste-tratamento/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/o-transplante-capilar-doi-descubra-a-resposta-a-esta-e-outras-questoes-sobre-o-procedimento/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/o-transplante-capilar-deixa-cicatriz-descubra-a-resposta-e-qual-a-tecnica-menos-agressiva-para-o-seu-couro-cabeludo/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/transplante-capilar-feminino-saiba-mais-sobre-o-procedimento-e-descubra-se-podera-beneficiar-do-mesmo/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/conheca-os-8-cuidados-essenciais-para-um-pos-transplante-capilar-de-sucesso/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/o-transplante-capilar-e-definitivo-conheca-a-resposta-e-decida-se-e-um-bom-investimento/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/confira-as-6-dicas-para-um-transplante-capilar-de-sucesso/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/qual-a-importancia-da-zona-dadora-no-transplante-capilar-descubra-a-resposta-dos-nossos-especialistas/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/as-17-perguntas-mais-frequentes-sobre-transplante-capilar-e-as-respostas-dos-especialistas/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/guia-essencial-para-escolher-a-clinica-de-transplante-capilar-certa-11-criterios-a-considerar/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/transplante-capilar-no-verao-ou-no-inverno-descubra-a-melhor-opcao-para-si/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/6-vantagens-da-tecnica-fue-que-fazem-do-seu-transplante-capilar-um-exito/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title:
      'https://clinicalhr.pt/quanto-tempo-ate-aos-resultados-do-transplante-capilar-saiba-a-verdade-sem-rodeios/',
    ref: '68ca3404-5be0-4e04-8df4-1821d5368a45',
  },
  {
    title: 'https://clinicalhr.pt/5-cuidados-com-o-cabelo-que-deve-ter-durante-o-verao/',
    ref: '8b05d8cf-c60a-40db-8bdf-231057b5dd32',
  },
  {
    title:
      'https://clinicalhr.pt/descubra-os-melhores-alimentos-para-a-queda-de-cabelo-e-os-seus-efeitos-na-saude-capilar/',
    ref: '8b05d8cf-c60a-40db-8bdf-231057b5dd32',
  },
  {
    title:
      'https://clinicalhr.pt/sofre-de-queda-de-cabelo-no-outono-veja-os-cuidados-a-ter-e-os-tratamentos-capilares-para-esta-epoca-do-ano',
    ref: '8b05d8cf-c60a-40db-8bdf-231057b5dd32',
  },
  {
    title: 'https://clinicalhr.pt/8-factos-sobre-transplante-de-barba-que-precisa-saber/',
    ref: '7520ff0a-f86c-4327-8b58-0c01fd129f3c',
  },
  {
    title:
      'https://clinicalhr.pt/falhas-na-barba-descubra-as-causas-e-saiba-como-resolver-o-seu-problema/',
    ref: '7520ff0a-f86c-4327-8b58-0c01fd129f3c',
  },
  {
    title: 'https://clinicalhr.pt/os-4-tipos-de-queda-de-cabelo-que-deve-conhecer/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title: 'https://clinicalhr.pt/conheca-as-7-principais-causas-para-a-queda-de-cabelo/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title:
      'https://clinicalhr.pt/queda-de-cabelo-e-calvicie-conheca-os-tratamentos-mais-eficazes-para-resolver-o-problema//',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title:
      'https://clinicalhr.pt/queda-de-cabelo-temporaria-ou-permanente-entenda-a-diferenca-e-saiba-como-tratar/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title: 'https://clinicalhr.pt/queda-de-cabelo-na-mulher-tipos-causas-e-tratamentos/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title:
      'https://clinicalhr.pt/compreenda-a-queda-capilar-no-pos-parto-e-descubra-o-melhor-tratamento-para-recuperar-a-saude-do-cabelo/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title:
      'https://clinicalhr.pt/como-escolher-o-melhor-tratamento-para-a-queda-de-cabelo-veja-todos-os-fatores-a-ter-em-conta/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title:
      'https://clinicalhr.pt/esta-com-queda-de-cabelo-excessiva-descubra-as-causas-e-como-resolver-o-seu-problema/',
    ref: 'be35aef2-a4e8-4ed6-ac8b-18e9fb9325b9',
  },
  {
    title: 'https://clinicalhr.pt/alopecia-o-que-e-principais-causas-tipos-e-tratamentos/',
    ref: '6dd652a3-269d-4288-ae68-ae7f3414a121',
  },
  {
    title:
      'https://clinicalhr.pt/a-alopecia-androgenetica-masculina-tem-cura-descubra-a-resposta-e-tudo-o-que-ha-para-saber-sobre-esta-condicao/',
    ref: '6dd652a3-269d-4288-ae68-ae7f3414a121',
  },
  {
    title:
      'https://clinicalhr.pt/como-posso-saber-se-tenho-alopecia-androgenetica-descubra-os-principais-sintomas-e-formas-de-tratar-esta-condicao/',
    ref: '6dd652a3-269d-4288-ae68-ae7f3414a121',
  },
  {
    title:
      'https://clinicalhr.pt/sofre-de-queda-de-cabelo-no-outono-veja-os-cuidados-a-ter-e-os-tratamentos-capilares-para-esta-epoca-do-ano/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/queda-de-cabelo-temporaria-ou-permanente-entenda-a-diferenca-e-saiba-como-tratar/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/queda-de-cabelo-e-calvicie-conheca-os-tratamentos-mais-eficazes-para-resolver-o-problema/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title: 'https://clinicalhr.pt/existem-outros-tratamentos-para-a-calvicie//',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/guia-rapido-sobre-mesoterapia-capilar-o-que-e-como-funciona-e-quais-os-beneficios/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title: 'https://clinicalhr.pt/queda-de-cabelo-na-mulher-tipos-causas-e-tratamentos/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/sera-eficaz-usar-o-minoxidil-para-a-calvicie-descubra-como-funciona-este-medicamento-e-de-que-forma-atua-na-queda-de-cabelo/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/como-escolher-o-melhor-tratamento-para-a-queda-de-cabelo-veja-todos-os-fatores-a-ter-em-conta/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
  {
    title:
      'https://clinicalhr.pt/tratamento-capilar-com-finasterida-sera-que-funciona-descubra-como-travar-a-calvicie-com-este-medicamento/',
    ref: '4c847fb9-448e-4571-88f1-96aa780be591',
  },
]

async function buildJSONfromStream(stream) {
  const xml = await new XmlStream(stream)

  return new Promise((res, rej) => {
    /**
     * Get some meta info
     */
    const meta = {}
    xml.on('text: wp:base_site_url', (url) => {
      meta.rootUrl = url.$text
    })

    /**
     * Get the categories
     */
    const categories = []
    xml.on('endElement: category', (wpCategory) => {
      const {nicename} = wpCategory.$
      const category = {
        _type: 'category',
        _id: generateCategoryId(nicename),
        title: nicename,
      }
      categories.push(category)
    })

    /**
     * Get the users
     */
    const users = []
    xml.on('endElement: wp:author', (author) => {
      const user = {
        _type: 'author',
        _id: generateAuthorId(author['wp:author_id']),
        name: author['wp:author_display_name'],
        slug: {
          current: slugify(author['wp:author_login'], {lower: true}),
        },
        email: author['wp:author_email'],
      }
      users.push(user)
    })

    /**
     * Get the posts
     */
    const posts = []
    xml.collect('wp:postmeta')
    xml.on('endElement: item', async (item) => {
      //nao copiar artigos em frances
      if (item['link'].includes('clinicalhr.pt/fr/') || item['link'].includes('clinicalhr.pt/en/'))
        return false

      const {title, category, link: permalink, description} = item
      if (item['wp:post_type'] != 'post' && item['wp:post_type'] != 'page') {
        return
      }

      // Filter the objects that match the desired title
      const matchingObjects = categorias.filter((obj) => obj.title === item['link'])

      // Create an array of reference objects
      const matchingRefs = matchingObjects.map((obj) => ({
        _type: 'reference',
        _ref: obj.ref,
      }))

      const post = {
        _type: 'post',
        title,
        slug: {
          //NAO FAZER slugify aqui. tentar aproveitar o que ja existe. senão tem de ser outra forma. isto está a atrofiar os caracteres!
          current: slugify(title, {lower: true}),
        },
        category: matchingRefs,
        content: parseBody(item['content:encoded']),
        date: parseDate(item),
        seo: {
          metaTitle: '',
          metaDesc: '',
        },
        author: {
          _type: 'reference',
          _ref: '8343dcf2-1578-4642-bd56-2cf9344b8e41',
        },
      }

      if (Array.isArray(item['wp:postmeta'])) {
        for (const meta of item['wp:postmeta']) {
          if (meta['wp:meta_key'] === '_yoast_wpseo_title') {
            post.seo.metaTitle = meta['wp:meta_value']
          }

          if (meta['wp:meta_key'] === '_yoast_wpseo_metadesc') {
            post.seo.metaDesc = meta['wp:meta_value']
          }

          if (meta['wp:meta_key'] === '_thumbnail_id') {
            const thumbnail_id = meta['wp:meta_value']
            const thumbnailUrl = `https://clinicalhr.pt/wp-json/wp/v2/media/${thumbnail_id}`

            if (!thumbnail_id > 0) return

            try {
              const response = await fetch(thumbnailUrl)
              const mediaData = await response.json()
              const mediaUrl = mediaData.source_url

              post.coverImage = {
                _type: 'image',
                _sanityAsset: `image@${mediaUrl}`,
              }
            } catch (error) {
              console.error('Error fetching media details:', thumbnailUrl, error)
            }
          }
        }
      }

      posts.push(post)
    })

    // there seems to be a bug where errors is not caught
    xml.on('error', (err) => {
      throw new Error(err)
    })

    xml.on('end', () => {
      const output = [
        /* meta, */
        ...users,
        ...posts,
      ]

      return res(output)
    })
  })
}

async function main() {
  const filename = './data/clinicalhr.2023-08-24.xml'
  const stream = await readFile(filename)
  const output = await buildJSONfromStream(stream)
  output.forEach((doc) => log(JSON.stringify(doc, null, 0)))
}

main()
