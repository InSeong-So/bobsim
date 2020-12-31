module.exports = {
    authRegistration:
        "insert into bs_members\n" +
        "  (\n" +
        "    `userId`,\n" +
        "    `password`\n" +
        "  )\n" +
        " values (?, ?)"
    , authLogin:
        "select userId,\n" +
        //"       password, \n" +
        "       note \n" +
        "  from bs_members\n" +
        " where userId = ?\n" +
        "   and password = ?\n"
}