"use strict";
// Приклад
const articleAccess = {
    admin: { create: true, read: true, update: true, delete: true },
    editor: { create: true, read: true, update: true, delete: false },
    viewer: { create: false, read: true, update: false, delete: false },
};
const articleValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.title)
            errors.push('Title is required.');
        if (!data.body)
            errors.push('Body is required.');
        return { isValid: errors.length === 0, errors };
    },
};
const productValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.name)
            errors.push('Name is required.');
        if (data.price <= 0)
            errors.push('Price must be greater than zero.');
        return { isValid: errors.length === 0, errors };
    },
};
// Приклад створення версії контенту
const createVersionedContent = (content) => (Object.assign(Object.assign({}, content), { version: 1, history: [] }));
// Приклад оновлення
const updateVersion = (content, updates) => {
    const updatedContent = Object.assign(Object.assign(Object.assign({}, content), updates), { updatedAt: new Date() });
    return Object.assign(Object.assign({}, updatedContent), { version: content.version + 1, history: [...content.history, content] });
};
