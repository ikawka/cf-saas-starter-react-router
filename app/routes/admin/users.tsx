import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/client";

export default function Users() {
  const createWorkflowMutation = api.user.createWorkflow.useMutation();

  return (
    <div>
      <h1>Users</h1>
      <Button onClick={() => {
        createWorkflowMutation.mutate({
          email: "test@example.com",
          metadata: {
            test: "test",
          },
        });
      }}>Trigger Workflow</Button>
      {createWorkflowMutation.isPending && <p>Creating workflow...</p>}
      {createWorkflowMutation.isSuccess && <p>Workflow created successfully</p>}
      {createWorkflowMutation.isError && <p>Error creating workflow</p>}
      <FileUpload onUploadSuccess={(key) => {
        console.log(key);
      }} />
    </div>
  );
}