module.exports = {
    authRegistration:
        "insert into bs_members\n" +
        "  (\n" +
        "    `email`,\n" +
        "    `name`,\n" +
        "    `password`\n" +
        "  )\n" +
        " values (?, ?, ?)"
    , authLogin:
        "select email,\n" +
        "       name, \n" +
        "       password \n" +
        "  from bs_members\n" +
        " where email = ?\n" +
        "   and password = ?\n"
}