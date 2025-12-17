"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Scroller } from "@/components/ui/scroller";

import { Spinner } from "@/components/ui/spinner";
import { MultipleImage } from "@/components/form/multiple-image";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { displayValidationError } from "@/lib/validation-handler";
import { upsertAboutUsSchema } from "@/schema/about-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { fetchImageAsFile } from "@/lib/utils";
import { updateAboutUs } from "@/lib/api/about-us";
import { createImage } from "@/lib/api/strapi-image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronUp, Trash2Icon } from "lucide-react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import type { AboutUs } from "@/types/strapi/single-type/about-us";
import type { Review } from "@/types/strapi/models/review";
import { getAllReviews } from "@/lib/api/reviews";
import { MultipleVideo } from "@/components/form/multiple-video";

export function AboutUsForm({ data }: { data?: AboutUs }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [availableReview, setAvailableReview] = useState<Review[]>([]);
  const form = useForm<z.infer<typeof upsertAboutUsSchema>>({
    resolver: zodResolver(upsertAboutUsSchema),
    defaultValues: {
      heading: {
        title: data?.heading?.title,
        description: data?.heading?.description,
        thumbnail: [],
      },
      message: data?.message,
      messageSection: {
        section: data?.messageSection?.section,
        image: [],
      },
      videoSection: {
        message: data?.videoSection?.message,
        video: [],
        cards: data?.videoSection?.cards,
      },
      reviewSection: {
        section: data?.reviewSection?.section,
        reviews:
          data?.reviewSection?.reviews?.map((review) => ({
            id: String(review.id),
            name: review.name,
          })) || [],
      },
    },
  });

  const videoSectionCards = useFieldArray({
    control: form.control,
    name: "videoSection.cards",
  });

  const reviewSectionReviews = useFieldArray({
    control: form.control,
    name: "reviewSection.reviews",
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (data?.heading?.thumbnail) {
        const file = await fetchImageAsFile(data.heading.thumbnail);
        form.setValue("heading.thumbnail", [file]);
      }
      if (data?.messageSection?.image) {
        const file = await fetchImageAsFile(data.messageSection.image);
        form.setValue("messageSection.image", [file]);
      }
      if (data?.videoSection?.video) {
        const file = await fetchImageAsFile(data.videoSection.video);
        form.setValue("videoSection.video", [file]);
      }
    };

    fetchImage();
  }, [data]);

  useEffect(() => {
    const fetchReview = async () => {
      const result = await getAllReviews({
        filters: {
          id: {
            $notIn: form
              .getValues("reviewSection.reviews")
              .map((review) => String(review.id)),
          },
        },
      });
      if (result.data) {
        setAvailableReview(result.data);
      }
    };

    fetchReview();
  }, [form.getValues("reviewSection.reviews")]);

  const onSubmit = useCallback(
    async (formData: z.infer<typeof upsertAboutUsSchema>) => {
      if (form.getFieldState("heading.thumbnail").isDirty) {
        const headingThumbnailResult = await createImage(
          formData.heading.thumbnail
        );
        switch (headingThumbnailResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading the category image!");
            return;
        }
        formData.heading!.thumbnail = headingThumbnailResult.data[0].id as any;
      } else {
        formData.heading!.thumbnail = data?.heading?.thumbnail?.id as any;
      }

      if (form.getFieldState("messageSection.image").isDirty) {
        const headingThumbnailResult = await createImage(
          formData.messageSection.image
        );
        switch (headingThumbnailResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading the category image!");
            return;
        }
        formData.messageSection!.image = headingThumbnailResult.data[0]
          .id as any;
      } else {
        formData.messageSection!.image = data?.messageSection?.image?.id as any;
      }

      if (form.getFieldState("videoSection.video").isDirty) {
        const headingThumbnailResult = await createImage(
          formData.videoSection.video
        );
        switch (headingThumbnailResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading the category image!");
            return;
        }
        formData.videoSection!.video = headingThumbnailResult.data[0].id as any;
      } else {
        formData.videoSection!.video = data?.videoSection?.video?.id as any;
      }

      const result = await updateAboutUs(formData);

      switch (result.type) {
        case "success":
          toast.success("About Us successfully updated!");
          redirect("/admin/about-us");
        case "validation":
          toast.error("Validation error");
          displayValidationError(form, result.validation);
          break;
        case "error":
          toast.error(result.message);
          break;
      }
    },
    [form]
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              name="heading"
              control={form.control}
              render={({ fieldState: headingState }) => (
                <FieldSet data-invalid={headingState.invalid}>
                  <FieldLegend>
                    Heading
                    <MarkRequired />
                  </FieldLegend>
                  <Card>
                    <CardContent>
                      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                        <Controller
                          name="heading.title"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Title
                                <MarkRequired />
                              </FieldLabel>
                              <Input
                                {...field}
                                type="text"
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="heading.description"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Description
                                <MarkRequired />
                              </FieldLabel>
                              <Textarea
                                {...field}
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="heading.thumbnail"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Thumbnail
                                <MarkRequired />
                              </FieldLabel>
                              <MultipleImage
                                value={field.value}
                                onChange={field.onChange}
                                aspectRatio={16 / 9}
                                maximumFiles={1}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  {headingState.invalid && (
                    <FieldError errors={[headingState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator className="my-4" />
            <FieldSet>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Message
                        <MarkRequired />
                      </FieldLabel>
                      <Textarea
                        {...field}
                        required
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator className="my-4" />
            <Controller
              name="messageSection"
              control={form.control}
              render={({ fieldState: messageSectionState }) => (
                <FieldSet data-invalid={messageSectionState.invalid}>
                  <FieldLegend>
                    Message Section
                    <MarkRequired />
                  </FieldLegend>
                  <Card>
                    <CardContent>
                      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                        <Controller
                          name="messageSection.section.title"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Title
                                <MarkRequired />
                              </FieldLabel>
                              <Input
                                {...field}
                                type="text"
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="messageSection.section.description"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Description
                                <MarkRequired />
                              </FieldLabel>
                              <Textarea
                                {...field}
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="messageSection.image"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Image
                                <MarkRequired />
                              </FieldLabel>
                              <MultipleImage
                                value={field.value}
                                onChange={field.onChange}
                                aspectRatio={1}
                                maximumFiles={1}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  {messageSectionState.invalid && (
                    <FieldError errors={[messageSectionState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator className="my-4" />
            <Controller
              name="videoSection"
              control={form.control}
              render={({ fieldState: videoSectionState }) => (
                <FieldSet data-invalid={videoSectionState.invalid}>
                  <FieldLegend>
                    Video Section
                    <MarkRequired />
                  </FieldLegend>
                  <Card>
                    <CardContent>
                      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                        <Controller
                          name="videoSection.message"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Message
                                <MarkRequired />
                              </FieldLabel>
                              <Textarea
                                {...field}
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="videoSection.video"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Video
                                <MarkRequired />
                              </FieldLabel>
                              <MultipleVideo
                                value={field.value}
                                onChange={field.onChange}
                                maximumFiles={1}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="videoSection.cards"
                          control={form.control}
                          render={({ fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldGroup className="gap-4">
                                <FieldLabel>
                                  Cards
                                  <MarkRequired />
                                </FieldLabel>
                                {videoSectionCards.fields.map(
                                  (field, index) => (
                                    <Collapsible
                                      className="border rounded-md"
                                      key={field.id}
                                    >
                                      <div className="p-3 w-full flex gap-3 items-center">
                                        <CollapsibleTrigger asChild>
                                          <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full group"
                                          >
                                            <ChevronUp className="group-data-[state=open]:rotate-180 transition-transform" />
                                          </Button>
                                        </CollapsibleTrigger>
                                        {field.header}
                                        <InputGroupButton
                                          type="button"
                                          variant="ghost"
                                          size="icon-xs"
                                          onClick={() =>
                                            videoSectionCards.remove(index)
                                          }
                                          aria-label={`Remove field ${index + 1}`}
                                          className="ms-auto"
                                        >
                                          <Trash2Icon />
                                        </InputGroupButton>
                                      </div>

                                      <CollapsibleContent className="px-3 pb-3 space-y-3">
                                        <Controller
                                          name={`videoSection.cards.${index}.header`}
                                          control={form.control}
                                          render={({
                                            field: controllerField,
                                            fieldState,
                                          }) => (
                                            <Field
                                              data-invalid={fieldState.invalid}
                                            >
                                              <FieldLabel>
                                                Header
                                                <MarkRequired />
                                              </FieldLabel>
                                              <FieldContent>
                                                <InputGroup>
                                                  <InputGroupInput
                                                    {...controllerField}
                                                    aria-invalid={
                                                      fieldState.invalid
                                                    }
                                                    type="text"
                                                    required
                                                  />
                                                </InputGroup>

                                                {fieldState.invalid && (
                                                  <FieldError
                                                    errors={[fieldState.error]}
                                                  />
                                                )}
                                              </FieldContent>
                                            </Field>
                                          )}
                                        />
                                        <Controller
                                          name={`videoSection.cards.${index}.description`}
                                          control={form.control}
                                          render={({
                                            field: controllerField,
                                            fieldState,
                                          }) => (
                                            <Field
                                              data-invalid={fieldState.invalid}
                                            >
                                              <FieldLabel>
                                                Description
                                                <MarkRequired />
                                              </FieldLabel>
                                              <FieldContent>
                                                <Textarea
                                                  {...controllerField}
                                                  required
                                                  aria-invalid={
                                                    fieldState.invalid
                                                  }
                                                />

                                                {fieldState.invalid && (
                                                  <FieldError
                                                    errors={[fieldState.error]}
                                                  />
                                                )}
                                              </FieldContent>
                                            </Field>
                                          )}
                                        />
                                        <Controller
                                          name={`videoSection.cards.${index}.ctaButton.title`}
                                          control={form.control}
                                          render={({
                                            field: controllerField,
                                            fieldState,
                                          }) => (
                                            <Field
                                              data-invalid={fieldState.invalid}
                                            >
                                              <FieldLabel>
                                                CTA Title
                                                <MarkRequired />
                                              </FieldLabel>
                                              <FieldContent>
                                                <InputGroup>
                                                  <InputGroupInput
                                                    {...controllerField}
                                                    aria-invalid={
                                                      fieldState.invalid
                                                    }
                                                    type="text"
                                                    required
                                                  />
                                                </InputGroup>

                                                {fieldState.invalid && (
                                                  <FieldError
                                                    errors={[fieldState.error]}
                                                  />
                                                )}
                                              </FieldContent>
                                            </Field>
                                          )}
                                        />
                                        <Controller
                                          name={`videoSection.cards.${index}.ctaButton.url`}
                                          control={form.control}
                                          render={({
                                            field: controllerField,
                                            fieldState,
                                          }) => (
                                            <Field
                                              data-invalid={fieldState.invalid}
                                            >
                                              <FieldLabel>
                                                CTA URL
                                                <MarkRequired />
                                              </FieldLabel>
                                              <FieldContent>
                                                <InputGroup>
                                                  <InputGroupInput
                                                    {...controllerField}
                                                    aria-invalid={
                                                      fieldState.invalid
                                                    }
                                                    type="text"
                                                    required
                                                  />
                                                </InputGroup>

                                                {fieldState.invalid && (
                                                  <FieldError
                                                    errors={[fieldState.error]}
                                                  />
                                                )}
                                              </FieldContent>
                                            </Field>
                                          )}
                                        />
                                      </CollapsibleContent>
                                    </Collapsible>
                                  )
                                )}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    videoSectionCards.append({
                                      header: "",
                                      description: "",
                                      ctaButton: {
                                        title: "",
                                        url: "",
                                      },
                                    })
                                  }
                                  disabled={
                                    videoSectionCards.fields.length >= 2
                                  }
                                >
                                  Add New Card
                                </Button>
                              </FieldGroup>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  {videoSectionState.invalid && (
                    <FieldError errors={[videoSectionState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator className="my-4" />
            <Controller
              name="reviewSection"
              control={form.control}
              render={({ fieldState: reviewSectionState }) => (
                <FieldSet data-invalid={reviewSectionState.invalid}>
                  <FieldLegend>
                    Review Section
                    <MarkRequired />
                  </FieldLegend>
                  <Card>
                    <CardContent>
                      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
                        <Controller
                          name="reviewSection.section.title"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Title
                                <MarkRequired />
                              </FieldLabel>
                              <Input
                                {...field}
                                type="text"
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="reviewSection.section.description"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Description
                                <MarkRequired />
                              </FieldLabel>
                              <Textarea
                                {...field}
                                required
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="reviewSection.reviews"
                          control={form.control}
                          render={({ fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>
                                Reviews
                                <MarkRequired />
                              </FieldLabel>

                              <Popover
                                open={isPopoverOpen}
                                onOpenChange={setIsPopoverOpen}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className="justify-between"
                                  >
                                    Add review relation
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search review..."
                                      className="h-9"
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        No review found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {availableReview.map((review) => (
                                          <CommandItem
                                            key={review.id}
                                            value={String(review.id)}
                                            onSelect={() => {
                                              reviewSectionReviews.append({
                                                id: String(review.id),
                                                name: review.name,
                                              });
                                              setIsPopoverOpen(false);
                                            }}
                                          >
                                            {review.name}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>

                              <Scroller className="h-72 space-y-4">
                                {reviewSectionReviews.fields.map(
                                  (field, index) => (
                                    <Item variant="outline" key={field.id}>
                                      <ItemContent>
                                        <ItemTitle>{field.name}</ItemTitle>
                                      </ItemContent>
                                      <ItemActions>
                                        <InputGroupButton
                                          type="button"
                                          variant="ghost"
                                          size="icon-xs"
                                          onClick={() =>
                                            reviewSectionReviews.remove(index)
                                          }
                                          aria-label={`Remove field ${index + 1}`}
                                          className="ms-auto"
                                        >
                                          <Trash2Icon />
                                        </InputGroupButton>
                                      </ItemActions>
                                    </Item>
                                  )
                                )}
                              </Scroller>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </CardContent>
                  </Card>

                  {reviewSectionState.invalid && (
                    <FieldError errors={[reviewSectionState.error]} />
                  )}
                </FieldSet>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting && <Spinner />}
              Edit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
