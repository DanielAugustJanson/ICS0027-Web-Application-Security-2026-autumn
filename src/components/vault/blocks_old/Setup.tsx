
import { FieldDescription, FieldGroup, FieldLegend, FieldSet, FieldLabel, FieldError, Field } from "@/components/ui/field";
import {Input } from "@/components/ui/input";

export default function Setup() {
    return (
        <FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
  </FieldGroup>
</FieldSet>


    )
}
