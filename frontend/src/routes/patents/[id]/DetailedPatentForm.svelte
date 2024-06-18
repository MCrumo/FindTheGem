<script lang="ts">
  import CalendarIcon from 'lucide-svelte/icons/calendar';
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    parseDate
  } from '@internationalized/date';
  import { cn } from '$lib/utils.js';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import { Calendar } from '$lib/components/ui/calendar/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import { toast } from 'svelte-sonner';
  import { Input } from '$lib/components/ui/input/index';
  import * as Popover from '$lib/components/ui/popover/index';
  import { type SuperValidated, type Infer, superForm, dateProxy } from 'sveltekit-superforms';
  import type { PatentSchema } from '$lib/schemas/zod-schema';
  import CalendarCell from '$lib/components/ui/calendar/calendar-cell.svelte';

  export let data: SuperValidated<Infer<PatentSchema>>;
  let readonly = true;

  const form = superForm(data, {
    multipleSubmits: 'prevent',
    invalidateAll: 'force',
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success('Expense details updated successfully.');
        readonly = true;
      } else {
        toast.error('There was an error updating the expense details. Please check the form.');
      }
    }
  });

  let formData = form.form;
</script>

<!-- <SuperDebug data={$formData} /> -->
<form method="POST" class="m-4 flex flex-col gap-10" use:form.enhance id="detailed-expense-form">
  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="applicationNumber" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Application number</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.applicationNumber} />
        </Form.Control>
        <Form.Description>The application number for this patent.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="publicationNumber" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Application number</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.applicationNumber} />
        </Form.Control>
        <Form.Description>The publication number for this patent.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>

  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="title" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Title</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.title} />
        </Form.Control>
        <Form.Description>The title for this patent given by the authors.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="country" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Country</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.country} />
        </Form.Control>
        <Form.Description>Country/region where the patent is filled.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="status" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Status</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.status} />
        </Form.Control>
        <Form.Description>The current status for the pattern.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>

  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="grantDate" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Grant date</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.grantDate} />
        </Form.Control>
        <Form.Description>
          The date when the patent was granted. This is the date when the patent was approved.
        </Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="expirationDate" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Expiration day</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.expirationDate} />
        </Form.Control>
        <Form.Description>The expiration date for the patent.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>

  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="numberCitations" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Number of citations</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.numberCitations} />
        </Form.Control>
        <Form.Description>The number of citations the patent has.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="sizeFamily" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Size patent family</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.sizeFamily} />
        </Form.Control>
        <Form.Description>The patent family size.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>
</form>
