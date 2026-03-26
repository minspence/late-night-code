import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    groups: [
        {name: 'details', title: 'Details'},
        {name: 'editorial', title: 'Editorial'},
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            group: 'details',
            validation: (rule) => rule.required().error(`Can not be empty.`),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            group: 'details',
            options: {
                source: 'title'
            },
            validation: (rule) => rule.required().error(`Required to generate a page on the website.`),
        }),
        defineField({
            name: 'author',
            type: 'reference',
            group: 'details',
            to: [{type: 'author'}],
        }),
        defineField({
            name: 'categories',
            type: 'string',
            group: 'details',
            // change to 'to' to allow multiple categories
            options: {
                list: ['web development', 'tutorial', 'work life balance', 'personal growth', 'other'],
                layout: 'radio',
            }

        }),
        defineField({
            name: 'date',
            type: 'datetime',
        })
    ]
})