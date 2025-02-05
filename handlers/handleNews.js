import News from '../models/News.js';

export function createNews(title,newsId,imageURL,para1,para2,creator,creatorId){

    const newNews = new News({
        title: title,
        newsId: newsId,
        imageURL: imageURL,
        para1: para1,
        para2: para2,
        creator: creator,
        creatorId: creatorId
    });

    newNews.save()
        .then(news=> console.log("News saved:"))
        .catch(err=> console.log("Error while saving news",err));
}

export async function modifyNews(newsId,updates){
    try{
        const updatedNews = await News.findOneAndUpdate({ newsId: newsId },updates,{new:true})
        if(updatedNews){
            console.log("news updated ");
            return true;
        }
        else{
            console.log("No such news found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while modifying news",err)
    }
}

export async function deleteNews(newsId){
    try{
        const result = await News.findOneAndDelete({ "newsId" : newsId })
        if(result){
            console.log("News deleted ")
            return true;
        }
        else{
            console.log("No such news found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while deleting news",err);
    }
    
}

export async function getAllNews() {
    try{
        const result = await News.find({})
        if(result){
            console.log("All news fetched")
            return Array.from(result);
        }
        else{
            console.log("No news found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while fetching news",err);
    }
}