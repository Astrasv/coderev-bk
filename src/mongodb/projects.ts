import mongoose from "mongoose";

type validTags = "" | "JavaScript" | "Python" | "Java"

interface Project {
    projectName:    string,
    email:          string,
    tags:           validTags[],
    codeReviewARN:  string,
}

interface ProjectWithId{
    id:             string,
    projectName:    string,
    email:          string,
    tags:           validTags[],
    codeReviewARN:  string,
}


const projectSchema = new mongoose.Schema<Project>({
    projectName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true,
    },
    tags: {
        type: [String],
        required: true,
        default: [""],
    },
    codeReviewARN: {
        type: String,
    },
});

export const ProjectModel = mongoose.model("projects", projectSchema);

export const removeAllProjects = async(email: string)
    : Promise<boolean> => {
    try {
        const filter = { email }
        const confirm = await ProjectModel.deleteMany(filter);
        if(confirm.deletedCount >= 1){
            return true;
        }
        return false;
    } catch (error){
        return false;
    }
}

export const removeProject = async(email: string, projectId: string)
    : Promise<boolean> => {
    try {
        const filter = { email, _id: projectId };
        const confirm = await ProjectModel.findOneAndDelete(filter);
        if(!confirm){
            return false;
        }
        return true;
    } catch (error){
        return false;
    }
}

export const createProject = async(projectData: Project)
    : Promise<ProjectWithId | false> => {
    try {
        const confirm = await ProjectModel.create(projectData);
        if(!confirm){
            return false;
        }
        const data: ProjectWithId = {
            id: confirm._id.toString(),
            projectName: confirm.projectName,
            email: confirm.email,
            tags: confirm.tags,
            codeReviewARN: confirm.codeReviewARN,
        }
        return data;
    } catch (error){
        return false;
    }
}

export const updateTags = async(projectId: string, tags: validTags)
    : Promise<ProjectWithId | false> => {
    try {
        const filter = { _id: projectId };
        const update = { $set: { tags: tags }};
        const options = { new: true };
        const confirm = await ProjectModel.findOneAndUpdate(filter, update, options);

        if(!confirm){
            return false;
        }

        const data: ProjectWithId = {
            id: confirm._id.toString(),
            projectName: confirm.projectName,
            email: confirm.email,
            tags: confirm.tags,
            codeReviewARN: confirm.codeReviewARN,
        }
        return data;
    } catch (error){
        return false;
    }
}

export const updateCodeReviewARN = async(projectId: string, codeReviewARN: string)
    : Promise<ProjectWithId | false> => {
    try {
        const filter = { _id: projectId };
        const update = { $set: { codeReviewARN: codeReviewARN }};
        const options = { new: true };
        const confirm = await ProjectModel.findOneAndUpdate(filter, update, options);

        if(!confirm){
            return false;
        }

        const data: ProjectWithId = {
            id: confirm._id.toString(),
            projectName: confirm.projectName,
            email: confirm.email,
            tags: confirm.tags,
            codeReviewARN: confirm.codeReviewARN,
        }
        return data;
    } catch (error){
        return false;
    }
}
