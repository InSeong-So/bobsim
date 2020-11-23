module.exports = {
    // 구분 콤보(한식, 양식 등 구분)
    getSigungu:
        "select location,\n" +
        "       locationDetail\n" +
        "  from bs_sigungu\n" +
        " where useYn = 'Y' "
};