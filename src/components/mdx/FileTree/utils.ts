
import type { DirectoryNode, FileNode, TreeNode } from "./types";

export const isDirectory = (node: TreeNode): node is DirectoryNode => {
    return node.type === "directory";
};

export const isFile = (node: TreeNode): node is FileNode => {
    return node.type === "file";
};

export const humanFileSize = (size: number) => {
    const i: number = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
};