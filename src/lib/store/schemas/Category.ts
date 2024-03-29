const Category = `
    type Category {
        """
        A link to the Web API endpoint returning full details of the category.
        """
        href: String
        icons: [Image]
        id: String
        name: String
        """
        Get a list of Spotify playlists tagged with a particular category
        limit: Default: 20. Minimum: 1. Maximum: 50
        """
        playlists(country: String, limit: Int, offset: Int): Paging
    }
`

export default Category
