export type DirectoryNode = {
    name: string;
    type: "directory";
    children: TreeNode[];
};

export type FileNode = {
    name: string;
    type: "file";
    size?: number;
    desc?: string;
};

export type FileSizeProps = {
    size?: number;
};

export type TreeNode = FileNode | DirectoryNode;
