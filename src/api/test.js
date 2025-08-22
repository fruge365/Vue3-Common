import request from "@/utils/request";

export const getHistoryApi = () => {
    return request({
        url: `/yiyan?type=hitokoto`,
        method: "get",
    });
};
