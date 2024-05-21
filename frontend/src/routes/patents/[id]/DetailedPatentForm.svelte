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

  let fields: string[] = $formData.applicationFields ?? [];
</script>

<!-- <SuperDebug data={$formData} /> -->
<form method="POST" class="m-4 flex flex-col gap-10" use:form.enhance id="detailed-expense-form">
  <input type="hidden" name="id" value={$formData.id} />
  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="applicationNumber" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Application number</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.applicationNumber} />
        </Form.Control>
        <Form.Description>The unique identifier for this patent.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="country" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Country</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.country} />
        </Form.Control>
        <Form.Description>Country/region where the patent is filed.</Form.Description>
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
      <Form.Field {form} name="owner" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Owner</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.owner} />
        </Form.Control>
        <Form.Description>The owners of the pattern.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>

  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="numberOfCitations" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Number of citations</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.numberOfCitations} />
        </Form.Control>
        <Form.Description>The number of citations the patent has.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="sizePatentFamily" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Size patent family</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.sizePatentFamily} />
        </Form.Control>
        <Form.Description>The patent family size.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>

  <section class="flex gap-5">
    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="status" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Status</Form.Label>
          <Input {...attrs} readonly bind:value={$formData.status} />
        </Form.Control>
        <Form.Description>The priority date of the patent.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="flex flex-row flex-wrap gap-5">
      <Form.Field {form} name="applicationFields" class="w-64">
        <Form.Control let:attrs>
          <Form.Label>Application fields</Form.Label>
          {#each fields as field}
            <Input {...attrs} readonly bind:value={field} />
          {/each}
        </Form.Control>
        <Form.Description>Industries where this pattern applies or is considered valuable.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </section>
</form>
