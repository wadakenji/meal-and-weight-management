

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."meals" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "datetime" timestamp with time zone NOT NULL,
    "name" character varying NOT NULL,
    "amount_of_energy" integer NOT NULL,
    "amount_of_protein" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."meals" OWNER TO "postgres";


ALTER TABLE "public"."meals" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."meals_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."step_records" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "date" "date" NOT NULL,
    "step" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."step_records" OWNER TO "postgres";


ALTER TABLE "public"."step_records" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."step_records_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "name" character varying DEFAULT ''::character varying NOT NULL,
    "is_admin" boolean DEFAULT false NOT NULL,
    "basal_metabolism_rate" smallint DEFAULT '0'::smallint NOT NULL,
    "energy_per_step" real DEFAULT '0'::real NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."weight_records" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "date" "date" NOT NULL,
    "weight" real NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."weight_records" OWNER TO "postgres";


ALTER TABLE "public"."weight_records" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."weght_records_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."meals"
    ADD CONSTRAINT "meals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."step_records"
    ADD CONSTRAINT "step_records_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."step_records"
    ADD CONSTRAINT "step_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."step_records"
    ADD CONSTRAINT "step_records_user_id_date_unique_constraint" UNIQUE ("user_id", "date");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."weight_records"
    ADD CONSTRAINT "weght_records_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."weight_records"
    ADD CONSTRAINT "weght_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."weight_records"
    ADD CONSTRAINT "weight_records_user_id_date_unique_constraint" UNIQUE ("user_id", "date");



ALTER TABLE ONLY "public"."meals"
    ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."step_records"
    ADD CONSTRAINT "step_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."step_records"
    ADD CONSTRAINT "step_records_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."weight_records"
    ADD CONSTRAINT "weght_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable insert for users based on user_id" ON "public"."meals" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."step_records" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."weight_records" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable read access for all users" ON "public"."meals" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."step_records" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."weight_records" FOR SELECT USING (true);



CREATE POLICY "Enable update for users based on user_id" ON "public"."meals" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."step_records" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."weight_records" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "insert_only_own" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."meals" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "select_all" ON "public"."users" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "public"."step_records" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "udpate_only_own" ON "public"."users" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."weight_records" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."meals" TO "anon";
GRANT ALL ON TABLE "public"."meals" TO "authenticated";
GRANT ALL ON TABLE "public"."meals" TO "service_role";



GRANT ALL ON SEQUENCE "public"."meals_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."meals_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."meals_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."step_records" TO "anon";
GRANT ALL ON TABLE "public"."step_records" TO "authenticated";
GRANT ALL ON TABLE "public"."step_records" TO "service_role";



GRANT ALL ON SEQUENCE "public"."step_records_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."step_records_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."step_records_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."weight_records" TO "anon";
GRANT ALL ON TABLE "public"."weight_records" TO "authenticated";
GRANT ALL ON TABLE "public"."weight_records" TO "service_role";



GRANT ALL ON SEQUENCE "public"."weght_records_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."weght_records_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."weght_records_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
