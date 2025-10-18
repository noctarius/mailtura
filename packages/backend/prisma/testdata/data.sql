-- Tenants
INSERT INTO tenants (id, name, created_at, created_by, updated_at, updated_by)
VALUES ('0199e407-dd7d-710f-957e-61af00ea997b', 'main', '2025-10-14 18:42:24.752', 'api', null, null),
       ('0199e407-dd7f-7dfb-81fc-f39d09316def', 'customer', '2025-10-14 18:42:24.752', 'api', null, null);

-- Contacts
INSERT INTO contacts (id, tenant_id, email, first_name, last_name, last_activity_at, created_at, created_by, updated_at, updated_by, list_ids)
VALUES ('0199c2c1-4c6b-7b41-9c39-7509825164d7', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'john@doe.com', 'John', 'Doe', null, '2025-10-08 07:37:51.977', 'api', null, null, null);

-- Campaigns
INSERT INTO campaigns (id, tenant_id, name, status, type, recipients, sent, created_at, created_by, updated_at, updated_by, delivered, scheduled_for)
VALUES ('0199e418-3e65-71db-87db-9709f5b6bf92', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Welcome Series - New Users', 'Active', 'Automated', 15234, 12890, '2025-10-14 19:36:45.637', 'api', null, null, 12654, null),
       ('0199e41d-a200-7e4e-be23-ce12000b4fea', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Black Friday Promotion', 'Scheduled', 'OneTime', 45678, 0, '2025-10-14 19:36:45.637', 'api', null, null, 0, '2021-07-20 12:00:00.000'),
       ('0199e427-9b08-7c52-9267-2d599bdf0f9a', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Product Update Newsletter', 'Completed', 'OneTime', 28456, 28456, '2025-10-14 19:36:45.637', 'api', null, null, 27923, null),
       ('0199e42a-f506-7bdc-be6a-22bbbdd8abb5', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Cart Abandonment Recovery', 'Active', 'Automated', 8934, 7234, '2025-10-14 19:36:45.637', 'api', null, null, 7089, null),
       ('0199e42b-94b5-7512-a8f8-f334a119d2f3', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Monthly Newsletter - December', 'Draft', 'OneTime', 0, 0, '2025-10-14 19:36:45.637', 'api', null, null, 0, null);

-- Subscriber Lists
INSERT INTO subscriber_lists (id, tenant_id, name, description, created_at, created_by, updated_at, updated_by)
VALUES ('0199eb85-8cd9-7909-953f-b17a382105ab', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'All Contacts', 'All contacts in your database', '2024-01-01 00:00:00.000', 'demo', null, null),
       ('0199eb85-8ce2-71ba-912c-0d764ef9cca4', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Newsletter Subscribers', 'Users subscribed to weekly newsletter', '2024-01-15 00:00:00.000', 'demo', null, null),
       ('0199eb85-8ce8-79e7-a584-f6e3612bfdcd', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Customers', 'Active paying customers', '2024-01-10 00:00:00.000', 'demo', null, null),
       ('0199eb85-8cec-7d70-ad23-cf850c5ceefe', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Trial Users', 'Users on free trial', '2024-01-20 00:00:00.000', 'demo', null, null),
       ('0199eb85-8cf0-7713-ad8b-26c3894b8429', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'VIP Members', 'Premium tier customers', '2024-01-25 00:00:00.000', 'demo', null, null),
       ('0199eb85-8cf4-76ec-a9a7-04d90dd4fea6', '0199e407-dd7d-710f-957e-61af00ea997b', 'All Contacts', 'All contacts in your database', '2024-01-01 00:00:00.000', 'demo', null, null);

-- Subscribers
INSERT INTO subscribers (id, tenant_id, status, subscriber_list_id, contact_id, subscribed_at, created_at, created_by, updated_at, updated_by)
VALUES ('0199eb88-d951-75c2-b46b-91480cef01d5', '0199e407-dd7f-7dfb-81fc-f39d09316def', 'Subscribed', '0199eb85-8ce2-71ba-912c-0d764ef9cca4', '0199c2c1-4c6b-7b41-9c39-7509825164d7', '2024-10-16 07:40:03.000', '2024-10-16 07:40:03.000', 'demo', null, null);