import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { CreateContact } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { contactsKeys } from "./keys.js";

interface CreateContactProps {
  tenantId: string;
  contact: CreateContact;
}

const createContact = async (tenantId: string, contact: CreateContact) => {
  const response = await fetch(`http://localhost:3000/api/tenants/${tenantId}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export function useCreateContact({ tenantId, contact }: CreateContactProps) {
  const queryClient = useQueryClient();

  return useMutation(() => ({
    mutationFn: () => createContact(tenantId, contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId) });
    },
  }));
}
