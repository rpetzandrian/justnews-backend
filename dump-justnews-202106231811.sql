PGDMP     '                    y            justnews     12.7 (Ubuntu 12.7-1.pgdg20.04+1)     13.3 (Ubuntu 13.3-1.pgdg20.04+1) 2    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16920    justnews    DATABASE     ]   CREATE DATABASE justnews WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE justnews;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            ?           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    16937 
   categories    TABLE       CREATE TABLE public.categories (
    id bigint NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone,
    category character varying(255) NOT NULL,
    image character varying(255) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false    3            ?            1259    17005    categories_id_seq    SEQUENCE     ?   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    204    3            ?            1259    16945    comments    TABLE     ?   CREATE TABLE public.comments (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    post_id bigint NOT NULL,
    text text NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.comments;
       public         heap    postgres    false    3            ?            1259    17003    comments_id_seq    SEQUENCE     ?   ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    205    3            ?            1259    16953    likes    TABLE     p   CREATE TABLE public.likes (
    id bigint NOT NULL,
    post_id bigint NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public.likes;
       public         heap    postgres    false    3            ?            1259    17001    likes_id_seq    SEQUENCE     ?   ALTER TABLE public.likes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    206    3            ?            1259    18127    notification    TABLE       CREATE TABLE public.notification (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    "from" integer NOT NULL,
    type character varying,
    message character varying,
    created_at timestamp(0) without time zone,
    is_read boolean
);
     DROP TABLE public.notification;
       public         heap    postgres    false    3            ?            1259    18125    notification_id_seq    SEQUENCE     ?   ALTER TABLE public.notification ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215    3            ?            1259    16929    posts    TABLE     ?  CREATE TABLE public.posts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    category_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    cover character varying(255) NOT NULL,
    text text NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone,
    watchs bigint,
    publish_at timestamp(0) without time zone,
    slug text NOT NULL
);
    DROP TABLE public.posts;
       public         heap    postgres    false    3            ?            1259    16999    posts_id_seq    SEQUENCE     ?   ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    203            ?            1259    17134    saves    TABLE     p   CREATE TABLE public.saves (
    id bigint NOT NULL,
    post_id bigint NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public.saves;
       public         heap    postgres    false    3            ?            1259    17149    saves_id_seq    SEQUENCE     ?   ALTER TABLE public.saves ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.saves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    212            ?            1259    16921    users    TABLE       CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    name character varying(255),
    username character varying(255),
    photo character varying(255),
    job character varying(255),
    bio text,
    phone character varying(255),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone,
    role character varying NOT NULL,
    google_id character varying,
    fb_id character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            ?            1259    16997    users_id_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    202            ?          0    16937 
   categories 
   TABLE DATA           ^   COPY public.categories (id, description, created_at, updated_at, category, image) FROM stdin;
    public          postgres    false    204            ?          0    16945    comments 
   TABLE DATA           V   COPY public.comments (id, user_id, post_id, text, created_at, updated_at) FROM stdin;
    public          postgres    false    205            ?          0    16953    likes 
   TABLE DATA           5   COPY public.likes (id, post_id, user_id) FROM stdin;
    public          postgres    false    206            ?          0    18127    notification 
   TABLE DATA           h   COPY public.notification (id, user_id, post_id, "from", type, message, created_at, is_read) FROM stdin;
    public          postgres    false    215            ?          0    16929    posts 
   TABLE DATA              COPY public.posts (id, user_id, category_id, title, cover, text, created_at, updated_at, watchs, publish_at, slug) FROM stdin;
    public          postgres    false    203            ?          0    17134    saves 
   TABLE DATA           5   COPY public.saves (id, post_id, user_id) FROM stdin;
    public          postgres    false    212            ?          0    16921    users 
   TABLE DATA           ?   COPY public.users (id, email, password, name, username, photo, job, bio, phone, created_at, updated_at, role, google_id, fb_id) FROM stdin;
    public          postgres    false    202            ?           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 4, true);
          public          postgres    false    211            ?           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 16, true);
          public          postgres    false    210            ?           0    0    likes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.likes_id_seq', 48, true);
          public          postgres    false    209            ?           0    0    notification_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.notification_id_seq', 31, true);
          public          postgres    false    214            ?           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 18, true);
          public          postgres    false    208            ?           0    0    saves_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.saves_id_seq', 16, true);
          public          postgres    false    213            ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 12, true);
          public          postgres    false    207                       2606    16944    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    204                       2606    16952    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    205                        2606    16957    likes likes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public            postgres    false    206            $           2606    18164    notification notif_id_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notif_id_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.notification DROP CONSTRAINT notif_id_pk;
       public            postgres    false    215                       2606    16936    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    203            "           2606    17138    saves saves_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.saves
    ADD CONSTRAINT saves_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.saves DROP CONSTRAINT saves_pkey;
       public            postgres    false    212                       2606    16928    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    202            &           2606    18143 !   comments comments_post_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE NOT VALID;
 K   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_post_id_foreign;
       public          postgres    false    205    2842    203            '           2606    18148 !   comments comments_user_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 K   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_user_id_foreign;
       public          postgres    false    205    202    2840            (           2606    18133    likes likes_post_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_post_id_foreign;
       public          postgres    false    2842    206    203            )           2606    18138    likes likes_user_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_user_id_foreign;
       public          postgres    false    206    202    2840            ,           2606    18165 "   notification notif_post_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notif_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE NOT VALID;
 L   ALTER TABLE ONLY public.notification DROP CONSTRAINT notif_post_id_foreign;
       public          postgres    false    2842    215    203            -           2606    18170 "   notification notif_user_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notif_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 L   ALTER TABLE ONLY public.notification DROP CONSTRAINT notif_user_id_foreign;
       public          postgres    false    215    202    2840            *           2606    18153    saves post_id_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.saves
    ADD CONSTRAINT post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE NOT VALID;
 :   ALTER TABLE ONLY public.saves DROP CONSTRAINT post_id_fk;
       public          postgres    false    2842    203    212            %           2606    18175    posts post_user_id_foreign    FK CONSTRAINT     ?   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 D   ALTER TABLE ONLY public.posts DROP CONSTRAINT post_user_id_foreign;
       public          postgres    false    203    2840    202            +           2606    18158    saves user_id_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.saves
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 :   ALTER TABLE ONLY public.saves DROP CONSTRAINT user_id_fk;
       public          postgres    false    202    2840    212            ?   ?   x?}?Mk?0?s?+|?jc;v???6?A.?^??8&??b'????l렬=	??A$y?9N^?¢FD??x@??r4?ƄdC? s?y???n?<???N?a??P??,q?1+????????-t-4?'?z3??7?l??"?߮?U)????bw.*+?E???뜢?t9??l????иY??Ke?KC?????A??	?I?_>6?:s8#??"?H?_5rB3??c?^?^?	|?.???}?n???7?      ?   ?   x?uл?0?9???@????F$XY*??Q????@?????ƛu??G??v??s??a????z?k?a??dJͭ=w3????????Cb?P&W?]???_Z(E[??DQJPHev??R7(?U?H.?ڬ??s??#?ʜ?	ۧr?>v?????T?)??t??-XNrw?ȤW?Y?? ??Z<      ?   :   x??? 1??P?J0????_ǒH??@g&?:?`??b9???z?n???4?G?'?      ?   ?   x???M?0??p??????????&?(Ė??wFe?J?4M???i	,p0???9e???|?iL???1??J$?aǡ?\X'?*?0??Ч?U4??wC?S???????x??ql=iNМZ&???5?2$Y?\?j???_?\Gɰ!%?Z??w?????Z??	?8ȟU
w??蘴љ??z??
J?g???-??	Z??      ?   ?  x??X?r?H<?_Ѻ?/I?(ƏݝX{?^9|r?Dh?m?????fU? ?c&?A??U???Uduu???\|Rn? O????????????Oj?e?_o?W??~????o?;?ՃRfٛS8?Q?$???AK?????pr??/??y??:?????b?ZW?j_V[?^??ö???;???+#????ŎK?,?6??}ҍ?nĨZy?U???a?U??l??7?U??n[-M?ջQ??Q??t?5?j[??O|Tۏ??ߞ>??8Fd???]??Ys`~?9?p????????Y5ϯ<q?%?Zݔ?x?_?Q?????W?Z????ڇ?s]m????EtG;6?+>??VjѩVu???m? ??ů^?B:5???1??<???P????|%<XJ?uq??l/?ؓB7?Q?JHz1R???u?Ao?׻??n??:???9%?ՠG)????wZ?m???{?w??????-??Q?P?l?(F@<?^uGI??`????Ìgp\???a?.n^?1????r:???J:hq?8:?ֻ?}??lf0? 汪갩???,?z?-?B???r??y?[]U?U?*_?;_e>y??}}?l_Ĝ_	aU?A?X????$.?^?l??>ڍ???w???_U?*?u??,=Qqf?$?]Oǃ???N??Ա?6???,??a?;l_rx~?N+??Ŗ???} Z??|?3?V?j?_]????Q??s!?9?????????+8?L?|???f7yt?9h?????Bv????|gO:x?;;?N???N4??s8=
٩? ?ƩzT??lt???I????R?˟pgm????O??_9*?M???G?
?q〣??<?z'?J ?Q??o{?????K???g??C?[8??>???N!?N???+?????8?ډV?F?Q#BJ??H??b????t??p??<?w!K??0??jy?$?Q??R="?j????15?_ѓ.??SZ???r
5?b??Q????Z?M ????	?Q?[??????j?$x0Ȝj?KA?C
?<??q?Y!Է??z5IH??Jp??Z????%5?l???"~2?;߶xE??m!Hp?8E???p??%d~?oj????(?K`:=?6d?q??^ ??????????n??;|R{'M?4???M?????~T??A???{mT??ub???>P}??6???HУ)?}.p?3??ȍ%De?P?o;?6??a\?%жDc?x"f[??ou-?6BO)???+P??G]??S??'D???S??2 $)?UG?B9?k??)ϊk???x??yY?,.śK?l`?????֒?R?1?5?K=%??TNW?Sm?H5Q"ɮ???S??@?c?D??6?Z?g??`a}?4??xRL?&(?Vlg?Nn?ݵn?L?䠆????1??X??:1,G?4????Y?Vj??m)?1??v+?k?;??Ii??u>=???tR????ޯ4y=<5K?6??<d?H?4??@??|????@??LH??'}?}?̓g?&??[r?F??j~7?m???I ?Cl6D"??٠? ?????ye!???GB?""EE???-k?r+??ug?'Ú?pf??f ??a???`)>?e??ΐ??TK?k?v?	? Y?(?y?U?K?l??` p???\???N??ɼ0BR2Il6Uκ?y?q/??pc?n:#l????=4??]????2?ظ0Ro?}2p?2&?!??+Wz?u????$??~?? edx`S?2 
 ?%Ų4fƥ???7???X#4)?s??Ql???v?(? G???6?A???:Vu'???Xo_Z?L?7???x" ?&?ɳ????2??
?4Ev??&??#??-??w????A?~)>?G?CΆ?b???-?E?!???'ftY?q3݋	H?s?.+?ȖDV??s?٫o???V?v?guD???7~Q??i??\S1Am:M??J?%x)?7?-Ӗ( y?(xj???Q?e??.?y?/??j&q&A?v?\?????x??????l??5;U???%?wF?I?y??Q?f?֝E??c@(????>?b??
?ei????????????:??`w??	{???Q߭????Me??X?q??	?bu???˂V?@	b??O?ǱRac??Km?[ [???B?L??I??[N ??-#?9È/?z땠߿?eu?⧾???O?(??!,?,????/M?      ?   #   x?3?4?4?2?44?4?? ʘ?H??qqq D?      ?   ?  x?u?Ko?0???W??a???v?Ω??jhDJ??%?&q?k??~???bKQG?G?F???X?j&j?&?B?*?"??8?"???0???fb?ϳ?G20۹?,?jȷ???518?3????{?n?W?bA[;??!F  k2B????4?U?$?4??5L?g???{???}?dʐ>P?j??q>V??U??]O?q\??(
???5:??2???????Ӡk??9%?q?????bv\?[`E??Ƶ|?)?j????#ۼ![??ZO9ho??????6eZ?T?eR????a??60A6hr^3
???E.???q
e{????>B??bQ??HdC)?X7U?\???????(tGG?F?????|?'n?K??$????nG?????????:-?`??????c?
6?_??	?(?0Ҡ?c?YXmD?Ŗ?L???:???M????????!K??c?????*?N?)??     