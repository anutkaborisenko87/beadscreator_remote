<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => 'Поле :attribute має бути прийнятим.',
    'accepted_if'          => 'Поле :attribute має бути прийнятим, коли :other дорівнює :value.',
    'active_url'           => 'Поле :attribute має бути дійсною URL-адресою.',
    'after'                => 'Поле :attribute має бути датою, що пізніше за :date.',
    'after_or_equal'       => 'Поле :attribute має бути датою, що пізніше або дорівнює :date.',
    'alpha'                => 'Поле :attribute має містити лише букви.',
    'alpha_dash'           => 'Поле :attribute має містити лише букви, цифри, тире та підкреслення.',
    'alpha_num'            => 'Поле :attribute має містити лише букви та цифри.',
    'array'                => 'Поле :attribute має бути масивом.',
    'ascii'                => 'Поле :attribute має містити лише однобайтові алфавітно-цифрові символи та знаки.',
    'before'               => 'Поле :attribute має бути датою, що відбувається до :date.',
    'before_or_equal'      => 'Поле :attribute має бути датою, що відбувається до або дорівнює :date.',
    'between'              => [
        'array'   => 'Поле :attribute має містити від :min до :max елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути від :min до :max кілобайт.',
        'numeric' => 'Поле :attribute має бути між :min та :max.',
        'string'  => 'Поле :attribute має містити від :min до :max символів.',
    ],
    'boolean'              => 'Поле :attribute має бути істинним або хибним.',
    'can'                  => 'Поле :attribute містить несанкціоноване значення.',
    'confirmed'            => 'Підтвердження поля :attribute не збігається.',
    'current_password'     => 'Пароль невірний.',
    'date'                 => 'Поле :attribute має бути дійсною датою.',
    'date_equals'          => 'Поле :attribute має бути датою, що дорівнює :date.',
    'date_format'          => 'Поле :attribute має відповідати формату :format.',
    'decimal'              => 'Поле :attribute має містити :decimal десяткових знаків.',
    'declined'             => 'Поле :attribute має бути відхилено.',
    'declined_if'          => 'Поле :attribute має бути відхилено, коли :other дорівнює :value.',
    'different'            => 'Поля :attribute та :other повинні бути різними.',
    'digits'               => 'Поле :attribute має містити :digits цифр.',
    'digits_between'       => 'Поле :attribute має містити від :min до :max цифр.',
    'dimensions'           => 'Поле :attribute має некоректні розміри зображення.',
    'distinct'             => 'Поле :attribute містить повторюване значення.',
    'doesnt_end_with'      => 'Поле :attribute не повинно закінчуватися одним із наступних: :values.',
    'doesnt_start_with'    => 'Поле :attribute не повинно починатися з одного із наступних: :values.',
    'email'                => 'Поле :attribute має бути дійсною електронною адресою.',
    'ends_with'            => 'Поле :attribute має закінчуватися одним із наступних: :values.',
    'enum'                 => 'Обране значення для поля :attribute недійсне.',
    'exists'               => 'Обране значення для поля :attribute недійсне.',
    'extensions'           => 'Поле :attribute має мати одне з наступних розширень: :values.',
    'file'                 => 'Поле :attribute має бути файлом.',
    'filled'               => 'Поле :attribute має містити значення.',
    'gt'                   => [
        'array'   => 'Поле :attribute має містити більше, ніж :value елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути більшим, ніж :value кілобайт.',
        'numeric' => 'Поле :attribute має бути більшим, ніж :value.',
        'string'  => 'Поле :attribute має містити більше, ніж :value символів.',
    ],
    'gte'                  => [
        'array'   => 'Поле :attribute має містити :value елементів або більше.',
        'file'    => 'Розмір файлу в полі :attribute має бути не менше ніж :value кілобайт.',
        'numeric' => 'Поле :attribute має бути не менше ніж :value.',
        'string'  => 'Поле :attribute має містити не менше ніж :value символів.',
    ],
    'hex_color'            => 'Поле :attribute має бути валідним шістнадцятковим кольором.',
    'image'                => 'Поле :attribute має бути зображенням.',
    'in'                   => 'Обране значення для поля :attribute недійсне.',
    'in_array'             => 'Поле :attribute має існувати в :other.',
    'integer'              => 'Поле :attribute має бути цілим числом.',
    'ip'                   => 'Поле :attribute має бути дійсною IP-адресою.',
    'ipv4'                 => 'Поле :attribute має бути дійсною IPv4-адресою.',
    'ipv6'                 => 'Поле :attribute має бути дійсною IPv6-адресою.',
    'json'                 => 'Поле :attribute має бути валідним JSON рядком.',
    'lowercase'            => 'Поле :attribute має бути у нижньому регістрі.',
    'lt'                   => [
        'array'   => 'Поле :attribute має містити менше, ніж :value елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути меншим, ніж :value кілобайт.',
        'numeric' => 'Поле :attribute має бути меншим, ніж :value.',
        'string'  => 'Поле :attribute має містити менше, ніж :value символів.',
    ],
    'lte'                  => [
        'array'   => 'Поле :attribute має містити не більше, ніж :value елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути не більшим, ніж :value кілобайт.',
        'numeric' => 'Поле :attribute має бути не більшим, ніж :value.',
        'string'  => 'Поле :attribute має містити не більше, ніж :value символів.',
    ],
    'mac_address'          => 'Поле :attribute має бути валідною MAC-адресою.',
    'max'                  => [
        'array'   => 'Поле :attribute не повинно містити більше ніж :max елементів.',
        'file'    => 'Розмір файлу в полі :attribute не повинен перевищувати :max кілобайт.',
        'numeric' => 'Поле :attribute не повинно бути більше ніж :max.',
        'string'  => 'Поле :attribute не повинно містити більше ніж :max символів.',
    ],
    'max_digits'           => 'Поле :attribute не повинно містити більше ніж :max цифр.',
    'mimes'                => 'Поле :attribute має бути файлом типу: :values.',
    'mimetypes'            => 'Поле :attribute має бути файлом типу: :values.',
    'min'                  => [
        'array'   => 'Поле :attribute має містити принаймні :min елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути не менше ніж :min кілобайт.',
        'numeric' => 'Поле :attribute має бути не менше ніж :min.',
        'string'  => 'Поле :attribute має містити принаймні :min символів.',
    ],
    'min_digits'           => 'Поле :attribute має містити принаймні :min цифр.',
    'missing'              => 'Поле :attribute має бути відсутнім.',
    'missing_if'           => 'Поле :attribute має бути відсутнім, коли :other дорівнює :value.',
    'missing_unless'       => 'Поле :attribute має бути відсутнім, якщо :other не дорівнює :value.',
    'missing_with'         => 'Поле :attribute має бути відсутнім, коли присутнє :values.',
    'missing_with_all'     => 'Поле :attribute має бути відсутнім, коли присутні :values.',
    'multiple_of'          => 'Поле :attribute має бути кратним :value.',
    'not_in'               => 'Обране значення для поля :attribute недійсне.',
    'not_regex'            => 'Формат поля :attribute недійсний.',
    'numeric'              => 'Поле :attribute має бути числом.',
    'password'             => [
        'letters'       => 'Поле :attribute має містити принаймні одну букву.',
        'mixed'         => 'Поле :attribute має містити принаймні одну велику та одну малу літеру.',
        'numbers'       => 'Поле :attribute має містити принаймні одну цифру.',
        'symbols'       => 'Поле :attribute має містити принаймні один символ.',
        'uncompromised' => 'Вказане значення :attribute було використано у витоку даних. Будь ласка, виберіть інше значення для :attribute.',
    ],
    'present'              => 'Поле :attribute має бути присутнім.',
    'present_if'           => 'Поле :attribute має бути присутнім, коли :other дорівнює :value.',
    'present_unless'       => 'Поле :attribute має бути присутнім, якщо :other не дорівнює :value.',
    'present_with'         => 'Поле :attribute має бути присутнім, коли присутні :values.',
    'present_with_all'     => 'Поле :attribute має бути присутнім, коли присутні :values.',
    'prohibited'           => 'Поле :attribute заборонено.',
    'prohibited_if'        => 'Поле :attribute заборонено, коли :other дорівнює :value.',
    'prohibited_unless'    => 'Поле :attribute заборонено, якщо :other не знаходиться в :values.',
    'prohibits'            => 'Поле :attribute забороняє наявність :other.',
    'regex'                => 'Формат поля :attribute недійсний.',
    'required'             => 'Поле :attribute є обов\'язковим.',
    'required_array_keys'  => 'Поле :attribute має містити записи для: :values.',
    'required_if'          => 'Поле :attribute є обов\'язковим, коли :other дорівнює :value.',
    'required_if_accepted' => 'Поле :attribute є обов\'язковим, коли :other прийнято.',
    'required_unless'      => 'Поле :attribute є обов\'язковим, якщо :other не знаходиться в :values.',
    'required_with'        => 'Поле :attribute є обов\'язковим, коли присутні :values.',
    'required_with_all'    => 'Поле :attribute є обов\'язковим, коли присутні :values.',
    'required_without'     => 'Поле :attribute є обов\'язковим, коли :values відсутні.',
    'required_without_all' => 'Поле :attribute є обов\'язковим, коли жодне з :values не присутнє.',
    'same'                 => 'Значення поля :attribute має збігатися з :other.',
    'size'                 => [
        'array'   => 'Поле :attribute має містити :size елементів.',
        'file'    => 'Розмір файлу в полі :attribute має бути :size кілобайт.',
        'numeric' => 'Поле :attribute має бути :size.',
        'string'  => 'Поле :attribute має містити :size символів.',
    ],
    'starts_with'          => 'Поле :attribute має починатися з одного з наступних: :values.',
    'string'               => 'Поле :attribute має бути рядком.',
    'timezone'             => 'Поле :attribute має бути дійсною часовою зоною.',
    'unique'               => 'Поле :attribute вже зайняте.',
    'uploaded'             => 'Не вдалося завантажити поле :attribute.',
    'uppercase'            => 'Поле :attribute має бути у верхньому регістрі.',
    'url'                  => 'Поле :attribute має бути дійсною URL-адресою.',
    'ulid'                 => 'Поле :attribute має бути валідним ULID.',
    'uuid'                 => 'Поле :attribute має бути валідним UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
