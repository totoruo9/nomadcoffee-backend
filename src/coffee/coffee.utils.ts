import client from "../client";

export const processHashtags = (caption:string) => {
    const hashtags = caption.match(/[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) || [];
    return hashtags.map((hashtag) => ({
        where: {hashtag},
        create: {hashtag}
    }));
}