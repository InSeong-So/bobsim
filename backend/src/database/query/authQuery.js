module.exports = {
    signUp:
        "insert into bs_members\n" +
        "  (\n" +
        "    `userId`,\n" +
        "    `password`\n" +
        "  )\n" +
        " values (?, ?)"
}