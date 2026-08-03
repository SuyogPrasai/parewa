import type { StructureResolver } from 'sanity/structure'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Parewa')
    .items([
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('article').title('Articles'),
              S.documentTypeListItem('event').title('Events')
            ])
        ),

      S.listItem()
        .title('Users')
        .child(
          S.list()
            .title('Users')
            .items([
              S.documentTypeListItem('alumni').title('Alumni'),
              S.documentTypeListItem('guest').title('Guests'),
              S.documentTypeListItem('student').title('Students'),
              S.documentTypeListItem('teacher').title('Teachers'),
            ])
        ),

      S.listItem()
        .title('Misc')
        .child(
          S.list()
            .title('Misc')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('link').title('Links'),
              S.documentTypeListItem('slider').title('Sliders'),
              S.documentTypeListItem('socials').title('Social Links'),
              S.documentTypeListItem('newsletterEmail').title('Newsletter Emails'),
            ])
        ),

      S.listItem()
        .title('Organization')
        .child(
          S.list()
            .title('Organization')
            .items([
              S.documentTypeListItem('department').title('Departments'),
              S.documentTypeListItem('house').title('Houses'),
              S.documentTypeListItem('position').title('Positions'),
              S.documentTypeListItem('role').title('Roles'),
              S.documentTypeListItem('credit').title('Credits'),
            ])
        ),

      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentListItem()
                .schemaType('general')
                .title('General')
                .id('general')
            ])
        ),
    ])

export default structure
