import request from "@/utils/request";

export const getHistoryApi = () => {
    return request({
        url: `/hotlist/douyinHot`,
        method: "get",
    });
};
