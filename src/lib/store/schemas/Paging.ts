const Paging = `
    union Item = Playlist | PlaylistTrack | Category | Artist | Track
    type Paging {
        href: String
        items: [Item]
        limit: Int
        offset: Int
        total: Int
    }
`

export default Paging
