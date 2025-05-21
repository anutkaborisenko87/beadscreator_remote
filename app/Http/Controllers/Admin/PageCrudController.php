<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PageRequest;
use App\Models\Language;
use App\Models\Page;
use Backpack\CRUD\app\Exceptions\AccessDeniedException;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Prologue\Alerts\Facades\Alert;

/**
 * Class PageCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class PageCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Page::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/page');
        CRUD::setEntityNameStrings('page', 'pages');
        $this->crud->operation(['list', 'show'], function () {
            $this->crud->setAccessCondition(['delete'], function ($entry) {
                return (bool)$entry->deletable === true;
            });
        });
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        if (! $this->crud->getRequest()->has('order')){
            $this->crud->orderBy('id', 'asc');
        }
        CRUD::addColumn([
            'name' => 'title',
            'label' => 'title',
            'type' => 'closure',
            'function' => function ($entry) {
                return $entry->translate ? $entry->translate->title : '';
            },
        ]);

        CRUD::addColumn([
            'name' => 'url',
            'label' => 'url',
            'type' => 'closure',
            'function' => function ($entry) {
                return "/" . $entry->slug;
            },
        ]);
        CRUD::column('home')->type('boolean')->label('Home');
        CRUD::column('status')->type('boolean')->label('Status');
        CRUD::column('publish_up')->type('date')->label('Publish up');
        /**
         * Columns can be defined using the fluent syntax:
         * - CRUD::column('price')->type('number');
         */


        CRUD::addColumn([
            'name' => 'intro',
            'label' => 'intro',
            'type' => 'closure',
            'function' => function ($entry) {
                return $entry->translate ? $entry->translate->intro : '';
            },
        ]);
        CRUD::addColumn([
            'name' => 'seo_title',
            'label' => 'seo_title',
            'type' => 'closure',
            'function' => function ($entry) {
                return $entry->translate ? $entry->translate->seo_title : '';
            },
        ]);
        CRUD::addColumn([
            'name' => 'meta_description',
            'label' => 'meta_description',
            'type' => 'closure',
            'function' => function ($entry) {
                return $entry->translate ? $entry->translate->meta_description : '';
            },
        ]);
        CRUD::addColumn([
            'name' => 'meta_robots',
            'label' => 'meta_robots',
            'type' => 'closure',
            'function' => function ($entry) {
                return $entry->translate ? $entry->translate->meta_robots : '';
            },
        ]);

    }

    public function setupShowOperation()
    {
        CRUD::column('slug')->type('string')->label('Slug');
        CRUD::column('home')->type('boolean')->label('Home');
        CRUD::column('status')->type('boolean')->label('Status');
        CRUD::column('publish_up')->type('date')->label('Publish up');
        $tabs = Language::getAllEnableLanguages();
        foreach ($tabs as $tab) {
            CRUD::column([
                'name' => 'title_' . $tab->id,
                'label' => 'Title (' . $tab->title . ')'
                ,
                'type' => 'closure',
                'function' => function ($entry) use ($tab) {
                    $translation = $entry->translate($tab->id)->first();
                    return $translation ? $translation->title : '';
                },
            ])->tab($tab->title);
            CRUD::column([
                'name' => 'intro' . $tab->id,
                'label' => 'intro(' . $tab->title . ')',
                'type' => 'closure',
                'function' => function ($entry) use ($tab) {
                    $translation = $entry->translate($tab->id)->first();
                    return $translation ? $translation->intro : '';
                },
            ])->tab($tab->title);
            CRUD::column([
                'name' => 'seo_title' . $tab->id,
                'label' => 'seo_title(' . $tab->title . ')',
                'type' => 'closure',
                'function' => function ($entry) use ($tab) {
                    $translation = $entry->translate($tab->id)->first();
                    return $translation ? $translation->seo_title : '';
                },
            ])->tab($tab->title);
            CRUD::column([
                'name' => 'meta_description' . $tab->id,
                'label' => 'meta_description(' . $tab->title . ')',
                'type' => 'closure',
                'function' => function ($entry) use ($tab) {
                    $translation = $entry->translate($tab->id)->first();
                    return $translation ? $translation->meta_description : '';
                },
            ])->tab($tab->title);
            CRUD::column([
                'name' => 'meta_robots' . $tab->id,
                'label' => 'meta_robots(' . $tab->title . ')',
                'type' => 'closure',
                'function' => function ($entry) use ($tab) {
                    $translation = $entry->translate($tab->id)->first();
                    return $translation ? $translation->meta_robots : '';
                },
            ])->tab($tab->title);
        }
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(PageRequest::class);
        $tabs = Language::getAllEnableLanguages();
        $isHomeExists = Page::where('home', true)->first();
        foreach ($tabs as $tab) {
            CRUD::addField([
                'label' => "Title (" . $tab->title . ")",
                'type' => 'text',
                'name' => 'translate[' . $tab->id . '][title]',
                'tab' => $tab->title,
            ]);
            CRUD::addField([
                'label' => "intro (" . $tab->title . ")",
                'type' => 'text',
                'name' => 'translate[' . $tab->id . '][intro]',
                'tab' => $tab->title,
            ]);
            CRUD::addField([
                'label' => "seo_title (" . $tab->title . ")",
                'type' => 'text',
                'name' => 'translate[' . $tab->id . '][seo_title]',
                'tab' => $tab->title,
            ]);
            CRUD::addField([
                'label' => "meta_description (" . $tab->title . ")",
                'type' => 'textarea',
                'name' => 'translate[' . $tab->id . '][meta_description]',
                'tab' => $tab->title,
            ]);
            CRUD::addField([
                'label' => "meta_robots (" . $tab->title . ")",
                'type' => 'text',
                'name' => 'translate[' . $tab->id . '][meta_robots]',
                'tab' => $tab->title,
            ]);
        }
        if (!$isHomeExists) {
            CRUD::addField([
                'label' => "Home",
                'type' => 'checkbox',
                'name' => 'home'
            ]);
        }

        CRUD::addField([
            'label' => "Publish up",
            'type' => 'date',
            'name' => 'publish_up'
        ]);
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $entry = $this->crud->getCurrentEntry();
        $disabled = $entry && $entry->id <= 4;
        $tabs = Language::getAllEnableLanguages();
        foreach ($tabs as $tab) {
            $translation = $entry->translate($tab->id)->first();
            CRUD::addField([
                'label' => "Title (" . $tab->title . ")",
                'type'  => 'text',
                'name'  => 'translate[' . $tab->id . '][title]',
                'tab'   => $tab->title,
                'value' => $translation ? $translation->title : '',
            ]);
            CRUD::addField([
                'label' => "intro (" . $tab->title . ")",
                'type'  => 'text',
                'name'  => 'translate[' . $tab->id . '][intro]',
                'tab'   => $tab->title,
                'value' => $translation ? $translation->intro : '',
            ]);
            CRUD::addField([
                'label' => "seo_title (" . $tab->title . ")",
                'type'  => 'text',
                'name'  => 'translate[' . $tab->id . '][seo_title]',
                'tab'   => $tab->title,
                'value' => $translation ? $translation->seo_title : '',
            ]);
            CRUD::addField([
                'label' => "meta_description (" . $tab->title . ")",
                'type'  => 'textarea',
                'name'  => 'translate[' . $tab->id . '][meta_description]',
                'tab'   => $tab->title,
                'value' => $translation ? $translation->meta_description : '',
            ]);
            CRUD::addField([
                'label' => "meta_robots (" . $tab->title . ")",
                'type'  => 'text',
                'name'  => 'translate[' . $tab->id . '][meta_robots]',
                'tab'   => $tab->title,
                'value' => $translation ? $translation->meta_robots : '',
            ]);
        }

        CRUD::addField([
            'label' => "Home",
            'type' => 'checkbox',
            'name' => 'home'
        ]);
        CRUD::addField([
            'label' => "Status",
            'type' => 'checkbox',
            'name' => 'status'
        ]);
        if (!$disabled) {
            CRUD::addField([
                'label' => "Deletable",
                'type' => 'checkbox',
                'name' => 'deletable'
            ]);
        }
        CRUD::addField([
            'label' => "Publish up",
            'type' => 'date',
            'name' => 'publish_up'
        ]);
    }

    public function store()
    {
        $this->crud->hasAccessOrFail('create');
        $isHomeExists = Page::where('home', true)->first();

        $request = $this->crud->validateRequest();
        // register any Model Events defined on fields
        $this->crud->registerFieldEvents();
        $data = $request->validated();

        if (!$isHomeExists && (bool)$data['home'] === false) {
            throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
        }

        $translations = $data['translate'];
        $data['slug'] = Str::slug(array_values($data['translate'])[0]['title']);


        unset($data['translate']);

        $item = $this->crud->create($data);
        Page::createTranslation($translations, $item);
        $this->data['entry'] = $this->crud->entry = $item;
        Alert::success(trans('backpack::crud.insert_success'))->flash();

        $this->crud->setSaveAction();

        return $this->crud->performSaveAction($item->getKey());
    }

    public function update()
    {
        $this->crud->hasAccessOrFail('update');


        $request = $this->crud->validateRequest();
        $updatedId = $request->get($this->crud->model->getKeyName());
        $isHomeExists = Page::where('home', true)->where('id', '!=', (int) $updatedId)->first();
        $this->crud->registerFieldEvents();
        $data = $this->crud->getStrippedSaveRequest($request);
        if (isset($data['home'])) {
            if (!$isHomeExists && (bool)$data['home'] === false) {
                throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
            } else if ($isHomeExists && (bool)$data['home'] === true) {
                throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
            }
        }


        $translations = $request->only('translate')['translate'];
        $data['slug'] = Str::slug(array_values($translations)[0]['title']);

        $item = $this->crud->update($updatedId, $data);
        Page::updateTranslation($translations, $item);
        $this->data['entry'] = $this->crud->entry = $item;
        Alert::success(trans('backpack::crud.update_success'))->flash();

        $this->crud->setSaveAction();

        return $this->crud->performSaveAction($item->getKey());
    }
}
