<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LanguageRequest;
use Backpack\CRUD\app\Exceptions\AccessDeniedException;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Prologue\Alerts\Facades\Alert;

/**
 * Class LanguageCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class LanguageCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Language::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/language');
        CRUD::setEntityNameStrings('language', 'languages');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::setFromDb(); // set columns from db columns.

        /**
         * Columns can be defined using the fluent syntax:
         * - CRUD::column('price')->type('number');
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(LanguageRequest::class);
        CRUD::setFromDb(); // set fields from db columns.

        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
    }

    public function store()
    {
        $this->crud->hasAccessOrFail('create');

        // execute the FormRequest authorization and validation, if one is required
        $request = $this->crud->validateRequest();


        // register any Model Events defined on fields
        $this->crud->registerFieldEvents();
        $data = $this->crud->getStrippedSaveRequest($request);
        if ((bool)$data['status'] === true && (bool)$data['default'] === true && $this->crud->model->where('default', true)->exists()) {
            $this->crud->model->where('default', true)->update(['default' => false]);
        } else if ((bool)$data['status'] === false && (bool)$data['default'] === true) {
            $data['default'] = false;
        }
        // insert item in the db
        $item = $this->crud->create($data);
        $this->data['entry'] = $this->crud->entry = $item;

        // show a success message
        Alert::success(trans('backpack::crud.insert_success'))->flash();

        // save the redirect choice for next time
        $this->crud->setSaveAction();

        return $this->crud->performSaveAction($item->getKey());
    }

    public function update()
    {
        $this->crud->hasAccessOrFail('update');

        $request = $this->crud->validateRequest();

        $this->crud->registerFieldEvents();
        $data = $this->crud->getStrippedSaveRequest($request);
        if ((bool)$data['status'] === true && (bool)$data['default'] === true && $this->crud->model->where('default', true)->exists()) {
            $this->crud->model->where('default', true)->update(['default' => false]);
        } else if ((bool)$data['status'] === false && (bool)$data['default'] === true && $this->crud->model->where('default', true)->exists()) {
            $data['default'] = false;
        } else if ((bool)$data['status'] === false && (bool)$data['default'] === true && !$this->crud->model->where('default', true)->exists()) {
            throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
        } else if ((bool)$data['default'] === false && !$this->crud->model->where('default', true)->exists()) {
            throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
        }
        $item = $this->crud->update(
            $request->get($this->crud->model->getKeyName()),
            $data
        );
        $this->data['entry'] = $this->crud->entry = $item;

        Alert::success(trans('backpack::crud.update_success'))->flash();

        $this->crud->setSaveAction();

        return $this->crud->performSaveAction($item->getKey());
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    protected function destroy($id)
    {
        $this->crud->hasAccessOrFail('delete');
        $id = (int) $this->crud->getCurrentEntryId() ?? $id;
        $deletingItem = $this->crud->model->findOrFail($id);
        if ($deletingItem->default) {
            throw new AccessDeniedException(trans('backpack::crud.unauthorized_access', ['access' => 'delete']), 403);
        }
        return $deletingItem->delete();
    }
}
