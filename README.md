# Guestify

სასტუმროს ციფრული QR გზამკვლევი — Web App / SaaS MVP.

სტუმარი ოთახში ასკანერებს QR კოდს და ხსნის მობილურ ვებ-აპლიკაციას (აპლიკაციის გადმოწერის გარეშე) —
სასტუმროს სერვისები, რესტორნის მენიუ, ადგილობრივი გზამკვლევი და წესები/კონტაქტი ერთ ადგილას.

## არქიტექტურა

- **White-label, slug-ზე დაფუძნებული**: ერთი codebase, თითოეული სასტუმრო იხსნება საკუთარი slug-ით
  (მაგ. `app.ge/hotel/aurahotel`) და ბაზიდან დინამიურად იტვირთება ფერები, ლოგო და მონაცემები.
- **მრავალენოვნება**: ქართული, ინგლისური, რუსული.
- **როლები**: Superadmin (ყველა სასტუმრო) და Hotel Admin (1 admin = 1 hotel, მხოლოდ საკუთარი მონაცემები).

## სტეკი

- **Frontend**: Angular
- **Backend & DB**: Supabase (PostgreSQL, Auth, Storage, Row Level Security)

## სტრუქტურა

```
supabase/
  migrations/
    0001_init_schema.sql   # ცხრილები, helper ფუნქციები, RLS policy-ები
    0002_storage.sql       # hotel-assets bucket + storage RLS
```
