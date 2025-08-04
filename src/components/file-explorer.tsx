import React from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment } from "react";

import Hint from "./hint";
import { Button } from "./ui/button";
import CodeView from "./code-view";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { convertFilesToTreeItems } from "@/lib/utils";
import TreeView from "./tree-view";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(filename: string): string {
  const extention = filename.split(".").pop()?.toLowerCase();
  return extention || "text";
}

interface FileBreadcrumbProps {
  filePath: string;
}

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
  const pathSegments = filePath.split("/");
  const maxSegments = 4;

  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <Fragment>
          <BreadcrumbItem className="text-muted-foreground">
            <BreadcrumbPage className="font-medium">
              {firstSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis className="text-muted-foreground" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {lastSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Fragment>
      );
    }
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

interface FileExplorerProps {
  files: FileCollection;
}

const FileExplorer = ({ files }: FileExplorerProps) => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const filesKyes = Object.keys(files);
    return filesKyes.length > 0 ? filesKyes[0] : null;
  });

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  const handleCopy = useCallback(() => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(files[selectedFile]);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [files, selectedFile]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
        <TreeView
          data={treeData}
          value={selectedFile}
          onSelect={handleFileSelect}
        />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors" />
      <ResizablePanel defaultSize={70} minSize={50} className="bg-sidebar">
        {selectedFile && files[selectedFile] ? (
          <div className="w-full h-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint text="Copy to clipboard" side="bottom">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="ml-auto"
                  disabled={false}
                  onClick={handleCopy}
                >
                  {copied ? <CopyCheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                code={files[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ) : (
          <div className="">Select a file to view its contents</div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default FileExplorer;
