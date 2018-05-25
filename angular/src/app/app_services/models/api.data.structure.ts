import { StringifyOptions } from "querystring";

export interface APIData {
    err,
    msg: String,
    data;
}



export interface TreeData {
    _id:String;
    id:number;
    name: String;
    parentId: String;
    parentName: String;
    childName: String;
    childId: String;
}

