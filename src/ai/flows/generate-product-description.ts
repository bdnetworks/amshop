'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating enhanced product descriptions using AI.
 *
 * The flow takes a basic product description as input and uses a language model to make it more persuasive and appealing.
 * It includes:
 *   - generateProductDescription: The main function to trigger the product description generation flow.
 *   - GenerateProductDescriptionInput: The input type for the generateProductDescription function.
 *   - GenerateProductDescriptionOutput: The output type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  basicDescription: z
    .string()
    .describe('A basic, unenhanced description of the product.'),
  exampleListing: z
    .string()
    .optional()
    .describe(
      'An optional example of a successful product listing for a similar product, used as a reference.'
    ),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  enhancedDescription: z
    .string()
    .describe('An enhanced, persuasive product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce product descriptions. Your goal is to transform basic product descriptions into compelling, persuasive content that drives sales.

  Here's the basic product description:
  {{basicDescription}}

  {{#if exampleListing}}
  Here's an example of a successful listing for a similar product. Use it as inspiration for tone and style, but do not directly copy content:
  {{exampleListing}}
  {{/if}}

  Rewrite the product description to be more engaging, highlighting key features and benefits. Focus on creating a sense of desire and urgency.
  The enhanced description should be approximately the same length as the original description.
  Do not include any introductory or concluding phrases, such as "Here is an enhanced description" or "In conclusion". Just output the enhanced description.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
