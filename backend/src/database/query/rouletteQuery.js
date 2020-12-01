module.exports = {
    // 구분 콤보(한식, 양식 등 구분)
    combo01:
        "select cd,\n" +
        "       cd_nm \n" +
        "  from bs_common\n" +
        " where idx_cd = '/SY01';"
    , conditionCombo01:
        "select cd,\n" +
        "       cd_nm\n" +
        "  from bs_common\n" +
        " where idx_cd = '/SY02'\n" +
        "   and cond_cd1 = (select cd\n" +
        "                     from bs_common\n" +
        "                    where idx_cd = '/SY01'\n" +
        "                      and cd_nm = '한식');"
    , thisRegionRestaurantList:
        "select t1.category,\n" +
        "       t1.restaurantNm\n" +
        "  from bs_restaurant t1,\n" +
        "       bs_common t2\n" +
        " where 1 = 1\n" +
        "   and t2.idx_cd = '/SY02'\n" +
        // "   and t1.localeDetail = '대덕구'\n" +
        "   and t2.cd_nm = t1.category;"
};